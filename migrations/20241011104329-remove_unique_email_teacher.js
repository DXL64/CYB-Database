module.exports = {
  async up(db, client) {
    await db.collection('teachers').dropIndex('email_1');
    await db.collection('teachers').createIndex(
      { email: 1 },
      { unique: false }
    );
  },

  async down(db, client) {
    await db.collection('teachers').dropIndex('email_1');
    await db.collection('teachers').createIndex(
      { email: 1 },
      { unique: true }
    );
  }
};
