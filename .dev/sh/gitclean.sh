mkdir .temp
touch .temp/.gitignore
tr -d '\r' < .gitignore > .temp/.gitignore

cat .temp/.gitignore | while IFS= read -r line; do
    if [[ $line = "" ]]; then
        continue
    fi

    if [[ $line =~ ^# ]]; then
        continue
    else
        git rm --cached -r $line
    fi
done

rm -rf .temp/.gitignore