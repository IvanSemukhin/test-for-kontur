import subprocess
import os
import pickle


def init_script():
    init_param = dict()
    try:
        ini_file = open("ini", "r")
        tmp = ini_file.read()
        tmp = tmp.split()
        for i in range(0, len(tmp) - 1, 2):
            if tmp[i] == "URL":
                init_param[tmp[i]] = tmp[i + 1]
            if tmp[i] == "DELAY":
                init_param[tmp[i]] = tmp[i + 1]
            if tmp[i] == "EMAIL":
                init_param[tmp[i]] = tmp[i + 1]
        print("Параметры считаны из файла[" + ini_file.name + "]")
        ini_file.close()
    except FileNotFoundError:
        print("Запуск без ini файла.", "Присвоить значения по умолчанию:\n")
        ini_file = open("ini", "w")

        url = "https://gitlab.com/kontur-tasks/trytobuild.git"
        # url = "https://github.com/IvanSemukhin/testrepo.git"
        init_param["URL"] = url
        print(init_param["URL"])
        ini_file.write("URL " + url + "\n")

        delay = "60"
        init_param["DELAY"] = delay
        print(init_param["DELAY"])
        ini_file.write("DELAY " + delay + "\n")

        email = "test@mail.ru"
        init_param["EMAIL"] = email
        print(init_param["EMAIL"])
        ini_file.write("EMAIL " + email + "\n")

        print("\nФайл [" + ini_file.name + "] записан со значениями по умолчанию\n")
        ini_file.close()
    return init_param


param = init_script()


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
            send_mail(clone.__name__, param["EMAIL"], result)


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
        branches = []
        for elem in result:
            index = elem.find("/")
            if index != -1:
                name = elem[index+1:]
                if name.find("HEAD") != -1:
                    continue
                if name not in branches:
                    branches.append(name)
        return branches

    except subprocess.CalledProcessError as e:
        result = str(e.output.decode('UTF-8'))  # Получить данные вывода исключения
        send_mail(remote_branch.__name__, param["EMAIL"], result)


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
        except subprocess.CalledProcessError as e:
            result = str(e.output.decode('UTF-8'))  # Получить данные вывода исключения
            if result.find("A branch named '" + name_branch + "' already exists.") != -1:
                continue
            else:
                send_mail(add_to_track.__name__, param["EMAIL"], result)


def pull(name_repo):
    try:
        result = subprocess.check_output(["git", "pull"], stderr=subprocess.STDOUT, cwd=name_repo)
        return result
    except subprocess.CalledProcessError as e:
        result = str(e.output.decode('UTF-8'))  # Получить данные вывода исключения
        send_mail(pull.__name__, param["EMAIL"], result)


def log(branches, name_repo):
    """
    Получает список веток и имя каталога реозитория
    Пробегает по всем веткам(выполняет checkout в каждую ветку)
    Командой git log получает инфо о ветке
    Парсит инфо на кортеж (ХЭШ_коммита, имя_автора)
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
            send_mail(log.__name__, param["EMAIL"], result)
    return heads


def checkout(branch, name_repo):
    try:
        subprocess.check_output(["git", "checkout", branch], stderr=subprocess.STDOUT, cwd=name_repo)
        pull(name_repo)
    except subprocess.CalledProcessError as e:
        result = str(e.output.decode('UTF-8'))  # Получить данные вывода исключения
        send_mail(checkout.__name__, param["EMAIL"], result)


def checkout_hr(branch, name_repo):
    try:
        subprocess.check_output(["git", "reset", "--hard"], stderr=subprocess.STDOUT, cwd=name_repo)
    except subprocess.CalledProcessError as e:
        result = str(e.output.decode('UTF-8'))  # Получить данные вывода исключения
        send_mail(checkout.__name__, param["EMAIL"], result)
    try:
        subprocess.check_output(["git", "checkout", branch], stderr=subprocess.STDOUT, cwd=name_repo)
    except subprocess.CalledProcessError as e:
        result = str(e.output.decode('UTF-8'))  # Получить данные вывода исключения
        send_mail(checkout.__name__, param["EMAIL"], result)


def diff(heads, current_heads):
    modify_branch = []
    for key in heads.keys():
        if key not in current_heads.keys():
            modify_branch.append(key)
        else:
            if heads[key][0] != current_heads[key][0]:
                modify_branch.append(key)
    return modify_branch


def build(branches, name_repo, heads):
    for elem in branches:   # каждый элемент: origin/master
        name_branch = elem.split("/")[1]
        checkout_hr(name_branch, name_repo)
        try:
            result = subprocess.check_output("xbuild /p:TargetFrameworkVersion=\"v4.5\"",
                                             stderr=subprocess.STDOUT,
                                             cwd=name_repo,
                                             shell=True)
            result = str(result)
            if result.find("Build succeeded.") == -1:
                raise subprocess.CalledProcessError(1, "xbuild /p:TargetFrameworkVersion=\"v4.5\"", result)
            else:
                print("Build succeeded for branch:", name_branch)
                result = result[result.find("Target Build:"):]
                left = result.find(name_repo)
                right = result.find(".csproj")
                name_app = result[left:right].split("/")[1]
                description = execute(name_repo, name_app)
                version = get_version(name_repo)
                commit_hash = heads[elem][0]
                author = heads[elem][1]
                author.rstrip()
                pack(get_id(), version, description, commit_hash, author, name_app, name_repo)
        except subprocess.CalledProcessError as e:
            result = str(e.output)  # Получить данные вывода исключения
            send_mail(build.__name__, param["EMAIL"], result)


def execute(name_repo, name_app):
    try:
        result = subprocess.check_output("mono " + name_repo + "/bin/Debug/" + name_app + ".exe",
                                         stderr=subprocess.STDOUT,
                                         shell=True)
    except subprocess.CalledProcessError as e:
        result = str(e.output)  # Получить данные вывода исключения
        send_mail(execute.__name__, param["EMAIL"], result)
    return result


def pack(identifier, version, description, commit_hash, author, name_app, name_repo):
    try:
        subprocess.check_output("mono ../nuget.exe spec -Force",
                                cwd=name_repo,
                                stderr=subprocess.STDOUT,
                                shell=True)
        print("Created nuspec successfully")

    except subprocess.CalledProcessError as e:
        result = str(e.output)
        send_mail(pack.__name__, param["EMAIL"], result)

    file = open(name_repo + "/" + name_app + ".nuspec", "r")
    text = file.read()
    file.close()
    text = text.replace("$id$", identifier, 1)
    text = text.replace("$version$", version, 1)
    text = text.replace("$title$", name_app, 1)
    text = text.replace("$author$", author, 2)
    text = text.replace("$description$", description + " " + commit_hash, 1)

    file = open(name_repo + "/" + name_app + ".nuspec", "w")
    file.write(text)
    file.close()

    try:
        subprocess.check_output("mono ../nuget.exe pack " + name_app + ".nuspec -Verbosity detailed",
                                cwd=name_repo,
                                stderr=subprocess.STDOUT,
                                shell=True)
        print("Create package successfully")
    except subprocess.CalledProcessError as e:
        result = str(e.output)
        send_mail(pack.__name__, param["EMAIL"], result)


def get_version(name_repo):
    for line in open(name_repo + "/Properties/AssemblyInfo.cs", "r"):
        if line.rfind("AssemblyVersion") != -1 and "*" not in line:
            return line[line.find("\"") + 1:line.rfind("\"")]


def get_id():
    id_file_name = ".id.bin"
    if os.path.exists(id_file_name):
        to_load = open(id_file_name, 'rb')
        app_id = pickle.load(to_load)
        to_load.close()

        app_id = str(int(app_id)+1)

        output = open(id_file_name, 'wb')
        pickle.dump(app_id, output, 4)
        output.close()
    else:
        output = open(id_file_name, 'wb')
        app_id = "1"
        pickle.dump(app_id, output, 4)
        output.close()
    return app_id


def send_mail(name_fun, email, message):
    print("Send EMAIL to", email)
    print("From function", name_fun)
    print("Message:", message)
    # exit(1)
