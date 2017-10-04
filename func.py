import subprocess


def init_script():
    param = dict()
    try:
        ini_file = open("ini", "r")
        tmp = ini_file.read()
        tmp = tmp.split()
        for i in range(0, len(tmp) - 1, 2):
            if tmp[i] == "URL":
                param[tmp[i]] = tmp[i + 1]
            if tmp[i] == "DELAY":
                param[tmp[i]] = tmp[i + 1]
            if tmp[i] == "EMAIL":
                param[tmp[i]] = tmp[i + 1]
        print("Параметры считаны из файла[" + ini_file.name + "]")
        ini_file.close()
    except FileNotFoundError:
        print("Запуск без ini файла.", "Присвоить значения по умолчанию:\n")
        ini_file = open("ini", "w")

        url = "https://gitlab.com/kontur-tasks/trytobuild.git"
        # url = "https://github.com/IvanSemukhin/testrepo.git"
        param["URL"] = url
        print(param["URL"])
        ini_file.write("URL " + url + "\n")

        delay = "60"
        param["DELAY"] = delay
        print(param["DELAY"])
        ini_file.write("DELAY " + delay + "\n")

        email = "test@mail.ru"
        param["EMAIL"] = email
        print(param["EMAIL"])
        ini_file.write("EMAIL " + email + "\n")

        print("\nФайл [" + ini_file.name + "] записан со значениями по умолчанию\n")
        ini_file.close()
    return param


def clone(remote):
    """
    Получает ссылку, например(https://gitlab.com/kontur-tasks/trytobuild.git)
    Выполняет клонирование.
    В случае ошибки сети завершает программу
    В случае успеха или попытки повторного клонирования
    Возвращает имя каталога репозитория
    Иначе завершает программу
    """
    try:
        result = subprocess.check_output(["git", "clone", remote], stderr=subprocess.STDOUT)
        result = result.decode('UTF-8')
        left = result.find("'") + 1
        right = result.rfind("'")
        return result[left:right]

    except subprocess.CalledProcessError as e:
        result = str(e.output.decode('UTF-8'))  # Получить данные вывода исключения

        if result.find("already exists and is not an empty directory") != -1:
            left = result.find("'") + 1
            right = result.rfind("'")
            return result[left:right]

        if result.find("Could not resolve host") != -1:
            print("Send EMAIL: From function clone() ", result)
            exit(1)


def remote_branch(name_repo):
    """
    Получает имя каталога репозитория
    Командой git получает список всех веток
    Формирует список сетевых веток(локальные фильтруются). Элемент спсиска(origin/name_branch)
    В случае успеха возвращает сформированный список
    Иначе завершает программу
    """
    try:
        result = subprocess.check_output(["git", "--git-dir", name_repo + "/.git", "branch", "-a"],
                                         stderr=subprocess.STDOUT)
        result = result.decode('UTF-8')
        result = result.split("\n")
        # print("result:", result)
        branches = []
        for elem in result:
            index = elem.find("/")
            # print(elem, index)
            if index != -1:
                name = elem[index+1:]
                if name.find("HEAD") != -1:
                    continue
                if name not in branches:
                    branches.append(name)
        return branches

    except subprocess.CalledProcessError as e:
        result = str(e.output.decode('UTF-8'))  # Получить данные вывода исключения
        print("Send EMAIL: From function remote_branch() ", result)
        exit(1)


def add_to_track(branches, name_repo):
    """
    Получает:
        список веток. Элемент спсиска(origin/name_branch)
        имя каталога репозитория
    Командой git делает сетевые ветки отслеживаемыми
    """
    for elem in branches:
        name_branch = elem.split("/")[1]
        try:
            subprocess.check_output(["git", "--git-dir", name_repo + "/.git", "branch", "--track", name_branch, elem],
                                    stderr=subprocess.STDOUT)
            # result = result.decode('UTF-8')
            # print(result)
        except subprocess.CalledProcessError as e:
            result = str(e.output.decode('UTF-8'))  # Получить данные вывода исключения
            if result.find("A branch named '" + name_branch + "' already exists.") != -1:
                continue
            else:
                print("Send EMAIL: From function add_to_track() ", result)


def pull(name_repo):
    try:
        result = subprocess.check_output(["git", "--git-dir", name_repo + "/.git", "pull"], stderr=subprocess.STDOUT)
        # result = result.decode('UTF-8')
        # print("result = ",result)
        return result
    except subprocess.CalledProcessError as e:
        result = str(e.output.decode('UTF-8'))  # Получить данные вывода исключения
        print("Send EMAIL: From function pull() ", result)
        exit(1)


def log(branches, name_repo):
    """
    Получает список веток и имя каталога реозитория
    Пробегает по всем веткам(выполняет checkout в каждую ветку)
    Командой git получает лог
    Парсит лог на кортеж (ХЭШ_коммита, имя_автора)
    В случае успеха возвращает словарь (имя_ветки: кортеж)
    Иначе завершает программу
    """
    heads = dict()
    for elem in branches:
        name_branch = elem.split("/")[1]
        checkout(name_branch, name_repo)
        try:
            result = subprocess.check_output(["git", "--git-dir", name_repo + "/.git", "log"], stderr=subprocess.STDOUT)
            result = result.decode('UTF-8')
            if result.find("commit ") != -1:
                result = result.split("\n")
                commit = result[0].replace("commit ", "")
                author = result[1][:result[1].find("<")].replace("Author: ", "")
                commit_and_author = (commit, author)
                heads[elem] = commit_and_author
        except subprocess.CalledProcessError as e:
            result = str(e.output.decode('UTF-8'))  # Получить данные вывода исключения
            print("Send EMAIL: From function log() ", result)
            exit(1)
    return heads


def checkout(branch, name_repo):
    try:
        # subprocess.check_output(["git", "--git-dir", name_repo + "/.git", "checkout", branch],
        #                         stderr=subprocess.STDOUT)
        subprocess.check_output(["git", "checkout", branch], stderr=subprocess.STDOUT, cwd=name_repo)
    except subprocess.CalledProcessError as e:
        result = str(e.output.decode('UTF-8'))  # Получить данные вывода исключения
        print("Send EMAIL: From function checkout() ", result)
        exit(1)


def diff(heads, current_heads):
    modify_branch = []
    for key in heads.keys():
        if key not in current_heads.keys():
            modify_branch.append(key)
        else:
            if heads[key][0] != current_heads[key][0]:
                modify_branch.append(key)
    return modify_branch


def build(branches):
    print("CALL BUILD:")
    print(branches)
    for elem in branches:
        print(elem)
