var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// collection 이름은 모델의 복수적 형태로 자동 변환됨(book -> books)
// 이름을 임의로 정하고 싶다면, schema 를 만들 때 따로 설정
// new Schema({..}, { collection: 'COLLECTION_NAME' });
var bookSchema = new Schema({
    title: String,
    author: String,
    published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('book', bookSchema);
