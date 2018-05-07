


    // const result = yield new Promise((resolve, reject) => {setTimeout(() => resolve(num), 10)});



async function f(num) {

}

[1,2,3,].forEach(async (item) => {
    await new Promise((resolve, reject) => {setTimeout(() => resolve(item), 10)}).then(console.log);
});




// const admin = require('firebase-admin');
// const Firestore = require('@google-cloud/firestore').Firestore;
//
// const serviceAccount = require('/Users/einar.adalsteinsson/.gcloud/islensk-tonlist.json');
//
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://islenzktonlist.firebaseio.com'
// });
//
// const firestore = new Firestore({
//     projectId: 'islenzktonlist',
//     keyFilename: '/Users/einar.adalsteinsson/.gcloud/islensk-tonlist.json',
// });
//
//
//
//
//
//
// const members = [
//     {
//         member: {
//             name: "Egill Ólafsson",
//             description: 'Egill Ólafsson (f. 9. febrúar 1953) er íslenskur söngvari, leikari, laga- og textahöfundur. Eiginkona hans er Tinna Gunnlaugsdóttir fyrrverandi Þjóðleikhússtjóri.\n' +
//             '\n' +
//             'Egill kom fram á sjónarsviðið 1975, fyrst með Spilverki þjóðanna, Stuðmönnum og Hinum íslenzka Þursaflokki. Í leikhúsi hóf hann störf 1976 í sýningu Gullna hliðsins hjá Þjóðleikhúsinu.',
//             __contentType: 'artist/person',
//             __ref: [],
//             __created: new Date(),
//             from: new Date('1953-02-09'),
//             to: null,
//             aka: ['Aggi Slæ'],
//         },
//         reference: {
//             __contentType: 'artist/member',
//             __created: new Date(),
//             periods: [{from: new Date('1974-01-01'), to: new Date('1977-01-01')}],
//         }
//     },{
//         member: {
//             name: "Valgeir Guðjónsson",
//             description: 'Valgeir Guðjónsson (f. 1952) er íslenskur tónlistarmaður, tónskáld og textahöfundur. Valgeir var meðal stofnenda Stuðmanna 1974-1988 og Spilverks þjóðanna 1975-1979.',
//             __contentType: 'artist/person',
//             __ref: [],
//             __created: new Date(),
//             from: new Date('1952-02-09'),
//             to: null,
//             aka: ['Valli'],
//         },
//         reference: {
//             __contentType: 'artist/member',
//             __created: new Date(),
//             periods: [{from: new Date('1974-01-01'), to: new Date('1979-01-01')}],
//         }
//     },{
//         member: {
//             name: "Sigrún Hjálmtýsdóttir",
//             description: ' is an Icelandic soprano and songwriter. Educated at the Reykjavík College of Music and the Guildhall School of Music and Drama in London, she began her singing career in the 1970s as a vocalist for the popular folk and pop group Spilverk Þjóðanna. She subsequently turned to classical music, particularly Lieder and operas.',
//             __contentType: 'artist/person',
//             __ref: [],
//             __created: new Date(),
//             from: new Date('1955-08-08'),
//             to: null,
//             aka: ['Diddú'],
//         },
//         reference: {
//             __contentType: 'artist/member',
//             __created: new Date(),
//             periods: [{from: new Date('1974-01-01'), to: new Date('1979-01-01')}],
//         }
//     },{
//         member: {
//             name: "Sigurður Bjóla",
//             description: 'Sigurður Bjóla Garðarsson (f. 1952) er íslenskt tónskáld og tónlistarmaður. Hann var söngvari og lagasmiður í Spilverki þjóðanna, Hrekkjusvínum og um tíma liðsmaður í Stuðmönnum. Hann samdi textan við lagið Nútíminn eftir Egil Ólafsson í flutningi Þursaflokksins.',
//             __contentType: 'artist/person',
//             __ref: [],
//             __created: new Date(),
//             from: new Date('1952-08-08'),
//             to: null,
//             aka: ['Bjóla', 'Sigurður Bjóla Garðarsson'],
//         },
//         reference: {
//             __contentType: 'artist/member',
//             __created: new Date(),
//             periods: [{from: new Date('1974-01-01'), to: new Date('1979-01-01')}],
//         }
//     },
// ];
//
//
// const createAndAttach = (collection, key, item, reference) => {
//     return firestore.collection(collection).add(item).then(songRef => {
//
//         const r = Object.assign({}, reference, {
//             _id: songRef,
//         });
//
//         return firestore.doc(key).get().then(albumRef => {
//
//             const __ref = albumRef.data().__ref;
//
//             return Promise.all([
//                 albumRef.ref.update({__ref : [...__ref, r]}),
//                 firestore.collection('reference').doc(songRef.id).set({__ref: [Object.assign(r, {_id: albumRef.ref})]})
//             ]);
//         })
//     })
// };
//
//
//
//     createAndAttach(
//         'artists',
//         '/artists/ErFlWd4XwKmVdVMjn7yA',
//         members[3].member,
//         members[3].reference
//     ).then(console.log).catch(console.error);
//
//
//
