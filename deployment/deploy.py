import os
import shutil

os.system("cd .. && cd server && dotnet publish -o ../publish")
os.system("cd .. && cd react-app && npm run build")

publish = "../publish"
wwwroot = publish + "/wwwroot"
react_build = "../react-app/build"

if os.path.exists(wwwroot):
    os.remove(wwwroot)
shutil.move(react_build, publish)
os.rename(publish + "/build", wwwroot)