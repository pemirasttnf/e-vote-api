'use strict';

const Uuidv4 = require('uuid/v4');

module.exports = {
    up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
        return queryInterface.bulkInsert('Candidate', [{
            candidateUuid: '09fc24d9-6165-4071-8ec3-83f66256a6b4',
            candidateNumber: 1,
            name: 'Ahmad Imaduddin',
            nim: '0110215010',
            position: 'Presiden Mahasiswa',
            studyProgram: 'Teknik Informatika',
            generationYears: '2015',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            candidateUuid: 'fb468841-8143-4313-a90f-47e56c800c82',
            candidateNumber: 2,
            name: 'Muhammad Abdul Karim',
            nim: '0110215053',
            position: 'Presiden Mahasiswa',
            studyProgram: 'Teknik Informatika',
            generationYears: '2015',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
        return queryInterface.bulkDelete('Candidate', null, {});
    }
};
