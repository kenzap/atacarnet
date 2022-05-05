# start live debug
npm run watch

# access localhost.
http://localhost:3000/?sid=1000452

# do final build
npm run build

# fix GitHub authentication problem (optional)
eval `ssh-agent -s`; ssh-add ~/.ssh/id_rsa_github_pavel; git push -f origin dev

# to dev branch GitHub
cd /Users/pavellukasenko/Documents/Market/Extensions/ecommerce/cloud &&/
git switch dev && git add . && git commit  -m "new rollup config and package.json" && git push origin dev

# push to Kenzap Cloud from GitHub
wget -q https://push.kenzap.cloud/kenzap/ecommerce/

# Github dev - > main
git checkout dev; git branch main dev -f; git checkout main; git push origin main -f