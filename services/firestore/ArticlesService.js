const { admin, firestore } = require('../../config/firebaseConfig')
const { nanoid } = require('nanoid');
const NotFoundError = require('../../exceptions/NotFoundError');

class ArticlesService {
  constructor(collection) {
    this.firestore = firestore;
    this.collectionRef = this.firestore.collection(collection);
  }

  async getArticles() {
    var dataAll = [];
    await this.collectionRef.get()
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          var member = {};
          member['ID Dokumen : '] = doc.id;
          member['Data Dokumen : '] = doc.data();
          dataAll.push(member);
        });

      })
      .catch((error) => {
        return ('Gagal mendapatkan data:', error);
      });
    console.log(dataAll);
    return dataAll;
  }

  async getArticleById(document) {
    const querySnapshot = await this.collectionRef.where('id', '==', document).get();
    var artikel = [];
    if (querySnapshot.empty) {
      throw new NotFoundError('Artikel Tidak Ditemukan');
    } else {
      querySnapshot.forEach((doc) => {
        artikel.push(doc.data());
      })
    }
    console.log(artikel);
    return artikel;
  }

  async postArticles(title, author, content, url) {
    const time = admin.firestore.Timestamp.now();
    const article = 
      {
        id: `article-${nanoid(16)}`,
        title: title,
        author: author,
        publishedDate: time,
        content: content,
        url: url
      };

      const documentRef = this.collectionRef.doc();
      documentRef.set(article)
        .then(() => {
          console.log('Berhasil menambahkan artikel');
        })
        .catch((error) => {
          console.error('Gagal menyimpan data:', error);
        });

    return article.id;
  }

  async deleteArticleById(article) {
    this.collectionRef.listDocuments().then((documents) => {
      const deletePromises = documents.map((document) => document.delete());
      return Promise.all(deletePromises);
    }).then(() => {
      console.log('Koleksi dan dokumennya berhasil dihapus');
    }).catch((error) => {
      console.error('Gagal menghapus koleksi dan dokumennya:', error);
    });
  }

  async deleteAllArticles() {
    this.collectionRef.listDocuments().then((documents) => {
      const deletePromises = documents.map((document) => document.delete());
      return Promise.all(deletePromises);
    }).then(() => {
      console.log('Koleksi dan dokumennya berhasil dihapus');
    }).catch((error) => {
      console.error('Gagal menghapus koleksi dan dokumennya:', error);
    });
  }
  async searchArticles(keyword) {
    const querySnapshot = await this.collectionRef.get();
    const articles = [];
    const newArticles = [];
    querySnapshot.forEach((doc) => {
      articles.push(doc.data());
    });

    articles.forEach((article) => {
      const filteredData = [article].filter(item => item.content.includes(keyword));
      if(filteredData.length !== 0) newArticles.push(filteredData);
    });
    console.log(newArticles);
    return newArticles;
  }
}

module.exports = ArticlesService;