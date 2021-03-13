import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { IState } from './store';
import { Store } from 'redux';
import { createClientStore } from './store';

const About = () => {
  //   const [data, setData] = useState(0);
  const stateData = useSelector((state: IState) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!stateData) {
      axios
        .get('http://localhost:3000/getData')
        .then((res) => {
          dispatch({
            type: 'CHANGE_DATA',
            payload: {
              data: res.data.data,
            },
          });
        })
        .catch((err) => {
          console.log('请求报错: ', err);
        });
    }
  });
  return (
    <div>
      <h2>About</h2>
      <p>获取到的数据：{stateData}</p>
    </div>
  );
};

About.loadData = (store: Store): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .get('http://localhost:3000/getData')
      .then((res) => {
        store.dispatch({
          type: 'CHANGE_DATA',
          payload: {
            data: res.data.data,
          },
        });
        resolve(res.data.data);
      })
      .catch((err) => {
        console.log('请求报错: ', err);
      });
  });
};

export default About;
