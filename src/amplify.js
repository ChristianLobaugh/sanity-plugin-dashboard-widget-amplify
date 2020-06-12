import React from 'react'
import PropTypes from 'prop-types'
import DefaultButton from 'part:@sanity/components/buttons/default'

import styles from './Amplify.css'

class Amplify extends React.Component {
  state = {
    error: null,
    deployLabel: null
  }
  deploySite = () => {
    const deployLabel = "Deployment requested."
    const webhook = this.props.webhookUrl + `&operation=startbuild`
    this.setState({deployLabel})
    fetch(
      webhook,
      {method: 'POST'},
      {'Content-Type': 'application/json'}
    )
  }

  render() {
    const {deployLabel, error} = this.state
    const {title, buttonText} = this.props;

    if (error) {
      return <pre>{JSON.stringify(error, null, 2)}</pre>
    }
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h4 className={styles.title}>{title}</h4>
        </header>
        
        <div className={styles.content}>
          <DefaultButton className={styles.button} inverted onClick={this.deploySite}>
            {buttonText}
          </DefaultButton>
          <span className={styles.status}>{deployLabel}</span>
        </div>
        {/* <div className={styles.footer}></div> */}
      </div>
    )
  }
}

Amplify.propTypes = {
  title: PropTypes.string,
  buttonText: PropTypes.string,
  webhookUrl: PropTypes.string
};

Amplify.defaultProps = {
  title: 'Deploy to Amplify',
  buttonText: `Deploy`,
  webhookUrl: null    
};

export default Amplify;
