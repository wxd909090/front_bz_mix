cd ./config
copy /y index.js index.js.tmp
copy /y index.js.local index.js

cd ../src
copy /y env.js env.js.tmp
copy /y env.js.local env.js

cd ../
call npm run build

cd ./config
copy /y index.js.tmp index.js

cd ../src
copy /y env.js.tmp env.js


PAUSE