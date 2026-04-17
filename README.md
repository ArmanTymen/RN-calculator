npx react-native start --reset-cache
npx react-native run-android --no-packager
npx react-native run-android --mode release
Для метрик запускай ТОЛЬКО npx react-native run-android --mode profile для андройд студио 

npx lint-staged: Запускает линтер и претиер только для тех файлов, которые ты изменил и хочешь закоммитить. Это быстро.

npx tsc --noEmit: А вот это — самая важная проверка. Она сканирует весь проект на ошибки типизации TypeScript, не создавая при этом лишних файлов. Если ты где-то в другом конце проекта сломал контракт данных, этот код не даст тебе сделать коммит.

Чтобы проверить весь проект прямо сейчас вручную (не дожидаясь коммита):

Для типов: npx tsc --noEmit

Для линта: npx eslint . (точка значит «весь проект»)
