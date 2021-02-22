import React, { useState, useEffect } from 'react';

import { Typography, Switch, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';

import PolicyIcon from '@material-ui/icons/Policy';

import classes from './footer.module.css'

import stores from '../../stores'
import {
  GET_BRIDGE_INFO,
  BRIDGE_INFO_RETURNED
} from '../../stores/constants'

import { formatCurrency } from '../../utils'

function Header(props) {

  const [ totalLocked, setTotalLocked ] = useState(0)

  useEffect(function() {
    const swapUpdated = () => {
      const storeTotalLocked = stores.swapStore.getStore('totalLocked')
      setTotalLocked(storeTotalLocked)
    }

    stores.emitter.on(BRIDGE_INFO_RETURNED, swapUpdated)
    stores.dispatcher.dispatch({ type: GET_BRIDGE_INFO })

    return () => {
      stores.emitter.removeListener(BRIDGE_INFO_RETURNED, swapUpdated)
    }
  },[]);

  return (
    <div className={ classes.footerContainer }>
      <div className={ classes.link }>
        <Typography variant='h5' className={ classes.auditText } color='textPrimary'>$ { formatCurrency(totalLocked) } Locked</Typography>
      </div>
        <a className={ classes.link } href='https://github.com/anyswap/Anyswap-Audit/blob/master/SlowMist/AnySwap%20CrossChain-Bridge%20Security%20Audit%20Report.pdf' target='_blank' rel="noreferrer">
        <Typography variant='h5' className={ classes.auditText } color='textPrimary'><PolicyIcon className={ classes.policyIcon } /> Security Audit</Typography>
      </a>
    </div>
  )
}

export default withTheme(Header)