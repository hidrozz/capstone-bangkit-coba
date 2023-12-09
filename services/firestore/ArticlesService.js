// const { Firestore } = require('@google-cloud/firestore');
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
    // const doc = await this.collectionRef.doc(document).get();
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
      // Tambahkan data ke dokumen
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
    // Menghapus seluruh koleksi dan dokumennya
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
    // Menghapus seluruh koleksi dan dokumennya
    this.collectionRef.listDocuments().then((documents) => {
      const deletePromises = documents.map((document) => document.delete());
      return Promise.all(deletePromises);
    }).then(() => {
      console.log('Koleksi dan dokumennya berhasil dihapus');
    }).catch((error) => {
      console.error('Gagal menghapus koleksi dan dokumennya:', error);
    });
  }

}

module.exports = ArticlesService;