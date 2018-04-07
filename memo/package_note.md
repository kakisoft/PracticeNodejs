## npm
https://www.npmjs.com/

### ejs
```
（ローカルインストール）
sudo npm install ejs

（グローバルインストール）
sudo npm -g install ejs
```
### Tips
#### npm ERR! Error: ETXTBSY, unlink
シンボリックリンクのあるフォルダには npmが出来ないみたい。      
windowsとの共有だと、無条件でNG？
```
sudo sudo npm install ejs --no-bin-links
```

_________________________________
## yarn
https://yarnpkg.com/ja/      
https://yarnpkg.com/en/      

## 使い方
https://yarnpkg.com/ja/docs/usage

### yarn インストール（ubuntu 16）
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```
### yarn バージョン確認
yarn --version

### プロジェクトの新規作成
yarn init

### インストール（依存関係の追加）
```
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

### 依存関係のアップグレード
```
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

### 依存関係の削除
yarn remove [package]


### プロジェクトの全ての依存関係のインストール
```
yarn

または

yarn install
```