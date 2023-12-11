const { admin, firestore } = require('../../config/firebaseConfig')
const { nanoid } = require('nanoid');
const NotFoundError = require('../../exceptions/NotFoundError');

class BatikService {
  constructor(collection) {
    this.firestore = firestore;
    this.collectionRef = this.firestore.collection(collection);
  }

  async getBatik() {
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

  async getBatikById(document) {
    const querySnapshot = await this.collectionRef.where('id', '==', document).get();
    var artikel = [];
    if (querySnapshot.empty) {
      throw new NotFoundError('Batik Tidak Ditemukan');
    } else {
      querySnapshot.forEach((doc) => {
        artikel.push(doc.data());
      })
    }
    console.log(artikel);
    return artikel;
  }

  async postBatik(title, origin, description, url) {
    const article =
    {
      id: `batik-${nanoid(16)}`,
      title: title,
      origin: origin,
      description: description,
      url: url
    };

    const documentRef = this.collectionRef.doc();
    documentRef.set(article)
      .then(() => {
        console.log('Berhasil menambahkan baik');
      })
      .catch((error) => {
        console.error('Gagal menyimpan data:', error);
      });

    return article.id;
  }

  async deleteBatikById(article) {
    this.collectionRef.listDocuments().then((documents) => {
      const deletePromises = documents.map((document) => document.delete());
      return Promise.all(deletePromises);
    }).then(() => {
      console.log('Koleksi dan dokumennya berhasil dihapus');
    }).catch((error) => {
      console.error('Gagal menghapus koleksi dan dokumennya:', error);
    });
  }

  async deleteAllBatik() {
    this.collectionRef.listDocuments().then((documents) => {
      const deletePromises = documents.map((document) => document.delete());
      return Promise.all(deletePromises);
    }).then(() => {
      console.log('Koleksi dan dokumennya berhasil dihapus');
    }).catch((error) => {
      console.error('Gagal menghapus koleksi dan dokumennya:', error);
    });
  }
  async searchBatik(keyword) {
   
    const querySnapshot = await this.collectionRef.get();
    const batikList = [];
    const newBatik = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      batikList.push(doc.data());
    });
    
    

    batikList.forEach((batik) => {
      const filteredData = [batik].filter(item => item && item.content && item.content.includes(keyword));
      if(filteredData.length !== 0) newBatik.push(filteredData);
    });
    console.log(newBatik);

    
    return batikList;
  
  // async searchBatik(keyword) {
  //   const querySnapshot = await this.collectionRef.get();
  //   const batikList = [];

  //   querySnapshot.forEach((doc) => {
  //       batikList.push(doc.data());
  //   });

  //   const filteredData = [batik].filter(item => item && item.content && item.content.includes(keyword));
  //   if(filteredData.length !== 0) newBatik.push(filteredData);
  //   const result = [[filteredBatikList]];  // Wrap the filtered list in an additional array

  //   console.log(result);
  //   return result;


  }
}

module.exports = BatikService;