const { Firestore } = require('@google-cloud/firestore');

class FirestoreService {
  constructor(collection) {
    this.firestore = new Firestore({
      projectId: 'circular-hybrid-404001',
      keyFilename: 'credentials/circular-hybrid-404001-f8635437f286.json',
    });
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

    return dataAll;
  }

  async getArticleById(document) {
    const doc = await this.collectionRef.doc(document).get();

    if (!doc.exists) {
      console.log('No such document!');
    } else {
      return ('Document data:', doc.data());
    }
  }

  async postArticles() {
    const articles = [
      {
        id: 1,
        title: "Cara Meningkatkan Produktivitas dengan Teknologi",
        author: "John Doe",
        publishedDate: "2023-12-01",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ..."
      },
      {
        id: 2,
        title: "Pengenalan Pemrograman dalam Bahasa Python",
        author: "Jane Smith",
        publishedDate: "2023-11-28",
        content: "Python adalah bahasa pemrograman yang sangat populer karena ..."
      },
      {
        id: 3,
        title: "Tips Menjaga Kesehatan Mental di Era Digital",
        author: "Amanda Johnson",
        publishedDate: "2023-11-25",
        content: "Kesehatan mental adalah aspek penting dari kesejahteraan kita. ..."
      },
      {
        id: 4,
        title: "Pengenalan Keamanan Informatika: Enkripsi dan Dekripsi",
        author: "Robert Williams",
        publishedDate: "2023-11-20",
        content: "Keamanan informasi adalah topik krusial dalam dunia teknologi. ..."
      },
      {
        id: 5,
        title: "Belajar Desain Grafis: Dasar-dasar dan Alat yang Diperlukan",
        author: "Maria Rodriguez",
        publishedDate: "2023-11-15",
        content: "Desain grafis adalah seni dan ilmu menciptakan visual yang menarik. ..."
      }
    ];
    // };

    // const collectionName = 'articles';
    // const documentId = 'article1'; // Opsional: Jika ingin menentukan ID dokumen sendiri

    // Dapatkan referensi koleksi dan dokumen
    // const collectionRef = firestore.collection(collectionName);

    // const documentRef = documentId ? collectionRef.doc(documentId) : collectionRef.doc();

    articles.forEach((article) => {
      const documentRef = this.collectionRef.doc();
      // Tambahkan data ke dokumen
      documentRef.set(article)
        .then(() => {
          console.log('Data berhasil disimpan');
        })
        .catch((error) => {
          console.error('Gagal menyimpan data:', error);
        });
    })

    return articles;
  }

}

module.exports = FirestoreService;