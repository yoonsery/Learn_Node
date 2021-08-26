## 파일정리 스크립트 만들기

### 계획

1.  사용자가 원하는 폴더의 이름을 받아온다
2.  그 폴더 안에 video, captured, duplicated 폴더를 만든다
3.  폴더안에 있는 파일들을 다 돌면서 해당하는 mp4|mov, png|aae, IMG_1234 (IMG_E1234) 2의 폴더로 옮긴다

#### [`process.argv`](https://nodejs.org/docs/latest/api/process.html#process_process_argv)

The process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched.

#### `path.join`

```js
path.join('/Users', 'sery', 'home/sweet', 'room');
// return: '/Users/sery/home/sweet/room'
```

#### `fs.existsSync(path)`

Returns true if the path exists, false otherwise

#### `String.prototype.startWith('word')`

The startsWith() method determines whether a string begins with the characters of a specified string, returning true or false as appropriate.

#### `fs.promises.rename(oldPath, newPath)`

The fs.rename() method is used to asynchronously rename a file at the given old path to a given new path. It will overwrite the destination file if it already exists.
