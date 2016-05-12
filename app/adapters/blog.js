import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  updateRecord(store, type, snapshot) {
    let body = JSON.stringify(snapshot.attributes());
    return this.get('s3').update(this.calculateKey(type, snapshot.id), body);
  }
});
