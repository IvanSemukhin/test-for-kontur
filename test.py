import time
import copy
# import os
# import pickle
from func import *

first = True
current_heads = dict()
heads = dict()
name_repo = ""
heads_file_name = ".heads.bin"
while True:
    if first:
        # print("First START:")
        name_repo = clone(param["URL"])
        # print(param)
        # print("name_repo= " + name_repo)

        branches = remote_branch(name_repo)
        # print("branches =", branches)

        add_to_track(branches, name_repo)

        if os.path.exists(heads_file_name):
            to_load = open(heads_file_name, 'rb')
            current_heads = pickle.load(to_load)
            # print("current_heads from bin = ", current_heads)
            to_load.close()
            # current_heads.clear()   # FOR DEBUG
        else:
            current_heads = log(branches, name_repo)
            # print("current_heads from func = ", current_heads)
            output = open(heads_file_name, 'wb')
            pickle.dump(current_heads, output, 4)
            output.close()

        heads = log(branches, name_repo)
        modify_branch = diff(heads, current_heads)
        build(modify_branch, name_repo, heads)

        first = False
    else:
        print("STEP:")
        branches = remote_branch(name_repo)
        add_to_track(branches, name_repo)
        pull(name_repo)

        new_heads = log(branches, name_repo)
        # print(new_heads)
        output = open(heads_file_name, 'wb')
        pickle.dump(new_heads, output, 4)
        output.close()
        modify_branch = diff(new_heads, heads)
        print("modify branch=", modify_branch)
        build(modify_branch, name_repo, new_heads)
        heads.clear()
        heads = copy.deepcopy(new_heads)
        new_heads.clear()
    time.sleep(int(param["DELAY"]))
