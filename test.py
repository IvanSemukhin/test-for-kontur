import time
import os
import pickle
from func import *

param = init_script()
first = True
current_heads = ""
while True:
    if first:
        first = False
        print("First START:")
        name_repo = clone(param["URL"])
        # print("name_repo= " + name_repo)

        branches = remote_branch(name_repo)
        # print("branches =", branches)

        add_to_track(branches, name_repo)

        if os.path.exists("heads.bin"):
            to_load = open('heads.bin', 'rb')
            current_heads = pickle.load(to_load)
            # print("current_heads from bin = ", current_heads)
            to_load.close()
        else:
            current_heads = log(branches, name_repo)
            # print("current_heads from func = ", current_heads)
            output = open('heads.bin', 'wb')
            pickle.dump(current_heads, output, 4)
            output.close()

        heads = log(branches, name_repo)
        modify_branch = diff(heads, current_heads)
        build(modify_branch)
    else:
        print("NEXT:")
        print("pull, get_diff, build, start, pack")
    time.sleep(int(param["DELAY"]))
