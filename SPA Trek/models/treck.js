const db = firebase.firestore();

export default {
  create(data) {
    return db.collection('trecks').add({ ...data });
  },
  getAll() {
    return db.collection('trecks').get();
  },
  get(id) {
    return db.collection('trecks').doc(id).get();
  },
  edit(id, data) {
    return db.collection('trecks').doc(id).update(data);
  },
  close(id){
    return db.collection('trecks').doc(id).delete();
  }
};
