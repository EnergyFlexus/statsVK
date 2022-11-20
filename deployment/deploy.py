import os
import shutil

os.system("cd .. && cd server && dotnet publish -o ../publish")
os.system("cd .. && cd react-app && npm run build")

publish = "../publish"
wwwroot = publish + "/wwwroot"
react_build = "../react-app/build"

if os.path.exists(wwwroot):
    shutil.rmtree(wwwroot, ignore_errors=True)
shutil.move(react_build, publish)
os.rename(publish + "/build", wwwroot)