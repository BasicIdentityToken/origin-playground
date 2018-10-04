import React from 'react'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import { Navbar, Alignment } from '@blueprintjs/core'

import Price from 'components/Price'
import Accounts from './accounts/Accounts'
import Marketplace from './marketplace/Marketplace'
import Listing from './marketplace/Listing'
import Contracts from './contracts/Contracts'

import AccountChooser from './accounts/_Chooser'

import TransactionToasts from './_TransactionToasts'
import NodeInfo from './_NodeInfo'

const App = () => (
  <>
    <TransactionToasts />
    <Navbar>
      <Navbar.Group>
        <Navbar.Heading className="logo">
          <img src="images/origin-logo-dark.png" /> ADMIN
        </Navbar.Heading>
        <NavLink
          className="bp3-button bp3-minimal"
          activeClassName="bp3-active"
          to="/marketplace"
        >
          Marketplace
        </NavLink>
        <NavLink
          className="bp3-button bp3-minimal"
          activeClassName="bp3-active"
          to="/contracts"
        >
          Contracts
        </NavLink>
        <NavLink
          className="bp3-button bp3-minimal"
          activeClassName="bp3-active"
          to="/accounts"
        >
          Accounts
        </NavLink>
        {/* <Navbar.Divider />
        <a className="bp3-button bp3-minimal bp3-active">Rinkeby</a>
        <a className="bp3-button bp3-minimal">Mainnet</a> */}
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Price amount="1" label="ETH Price" className="mr-2" />
        <NodeInfo />
        <AccountChooser />
      </Navbar.Group>
    </Navbar>
    <div className="p-3">
      <Switch>
        <Route path="/accounts" component={Accounts} />
        <Route path="/marketplace/listings/:listingID" component={Listing} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/contracts" component={Contracts} />
        <Redirect from="/" to="/marketplace" />
      </Switch>
    </div>
  </>
)

export default App

require('react-styl')(`
  .logo
    opacity: 0.75
    font-size: 1.2rem
    font-weight: 300
    img
      width: 68px
      vertical-align: -1px
      margin-right: 2px
  .text-center
    text-align: center
  .p-3
    padding: 1rem
  .mt-3
    margin-top: 1rem
  .mt-2
    margin-top: 0.5rem
  .mb-2
    margin-bottom: 0.5rem
  .ml-2
    margin-left: 0.5rem
  .mr-2
    margin-right: 0.5rem
  .mb-3
    margin-bottom: 1rem
  .vm > td
    vertical-align: middle !important
  .ellip
    max-width: 200px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
`)
