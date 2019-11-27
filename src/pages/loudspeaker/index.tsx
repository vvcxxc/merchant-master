/**title: 我的云音箱 */
import React, { Component } from 'react';
import router from 'umi/router';

export default class Loudspeaker extends Component {
    render() {
        return (
            <div onClick={()=>{router.push('/loudspeaker/apeakerInfo')}}>
                1111111111111
				</div>
        );
    }
}

