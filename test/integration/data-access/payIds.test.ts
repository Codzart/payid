import 'mocha'
import { assert } from 'chai'

import getAllAddressInfoFromDatabase from '../../../src/data-access/payIds'
import { seedDatabase } from '../../helpers/helpers'

describe('Data Access - getAllAddressInfoFromDatabase()', function (): void {
  before(async function () {
    await seedDatabase()
  })

  it('Gets address information for a known PayID (1 address)', async function () {
    // GIVEN a PayID known to exist in the database
    // WHEN we attempt to retrieve address information for that tuple
    const addressInfo = await getAllAddressInfoFromDatabase(
      'alice$xpring.money',
    )

    // THEN we get our seeded value back
    const expectedaddressInfo = [
      {
        paymentNetwork: 'XRPL',
        environment: 'TESTNET',
        details: {
          address: 'TVacixsWrqyWCr98eTYP7FSzE9NwupESR4TrnijN7fccNiS',
        },
      },
    ]
    assert.deepEqual(addressInfo, expectedaddressInfo)
  })

  it('Gets address information for a known PayID (multiple addresses)', async function () {
    // GIVEN a PayID known to exist in the database
    // WHEN we attempt to retrieve address information for that tuple
    const addressInfo = await getAllAddressInfoFromDatabase('alice$127.0.0.1')

    // THEN we get our seeded values back
    const expectedaddressInfo = [
      {
        paymentNetwork: 'XRPL',
        environment: 'MAINNET',
        details: {
          address: 'X7zmKiqEhMznSXgj9cirEnD5sWo3iZSbeFRexSFN1xZ8Ktn',
        },
      },
      {
        paymentNetwork: 'XRPL',
        environment: 'TESTNET',
        details: {
          address: 'TVacixsWrqyWCr98eTYP7FSzE9NwupESR4TrnijN7fccNiS',
        },
      },
      {
        paymentNetwork: 'BTC',
        environment: 'TESTNET',
        details: {
          address: 'mxNEbRXokcdJtT6sbukr1CTGVx8Tkxk3DB',
        },
      },
      {
        paymentNetwork: 'ACH',
        environment: null,
        details: {
          accountNumber: '000123456789',
          routingNumber: '123456789',
        },
      },
    ]
    assert.deepEqual(addressInfo, expectedaddressInfo)
  })

  it('Returns empty array for an unknown PayID', async function () {
    // GIVEN a PayID known to not exist in the database
    // WHEN we attempt to retrieve address information for that tuple
    const addressInfo = await getAllAddressInfoFromDatabase('johndoe$xpring.io')

    // THEN we get back an empty array
    assert.deepStrictEqual(addressInfo, [])
  })
})
