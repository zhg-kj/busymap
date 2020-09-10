import React, {Component} from 'react';
import {Textfit} from 'react-textfit';
import Lottie from 'react-lottie';

import './infoWindow.css';

import * as loadingData from '../../assets/lottie/loading.json';

class InfoWindow extends Component {
  render() {

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: loadingData.default,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return(
      <div className='infoWrapper'>
        {this.props.loading ? (
          <div>
            <Lottie options={defaultOptions} height={'auto'} width={'80%'}/>
          </div>
        ) : (
          <div>
            <div className='nameWrapper'>
              <Textfit mode='single' style={{width: '85%'}}>
                {this.props.name}
              </Textfit>
            </div>
            <div className='addressWrapper'>
              <Textfit mode='multi' style={{height: '7vh'}}>
                {this.props.address}
              </Textfit>
            </div>
            <div className='busyWrapper'>
              {this.props.busy === 'none' ? (
                <div className='percentage'>
                  <Textfit mode='multi' style={{height: '15vh'}}>
                    <h1>Previous busyness data has expired, click the button below to retrieve a new estimate.</h1>
                  </Textfit>
                </div>
              ) : (
                <div>
                  {this.props.busy === 'unavailable' ? (
                    <div>
                      <div className='percentage'>
                        <Textfit mode='multi' style={{height: '10vh'}}>
                          <h1>There is currently no data available for this location.</h1>
                        </Textfit>
                      </div>
                      <div className='time'>
                        <Textfit mode='single'>
                          <h1>Last updated today at {this.props.time} PST.</h1>
                        </Textfit>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className='percentage' style={{textAlign: 'center'}}>
                        <Textfit mode='single'>
                          <h1><span className='outline'>{this.props.busy}</span><span style={{fontSize: '35%', color: '#ea4335'}}> full.</span></h1>
                        </Textfit>
                      </div>
                      <div className='time'>
                        <Textfit mode='single'>
                          <h1>Last updated today at {this.props.time} PST.</h1>
                        </Textfit>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className='buttonWrapper'>
              {this.props.busy === 'none' ? (
                <button className='getBusyness' onClick={this.props.getBusyness}>GET BUSYNESS</button> 
              ) : (
                <button className='getBusyness' onClick={this.props.getBusyness}>UPDATE BUSYNESS</button>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default InfoWindow;