//"use client" //client use krega to gsap ayega wrna black rhega kuch render hi nhi krega

import { useState } from 'react'
import './App.css'
import axios from 'axios'
import Loading from './Loading';
import { FaMoon, FaSun } from 'react-icons/fa'; // icons toggle krna hia to use kra
import { BsAndroid2 } from "react-icons/bs";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RiRobot3Fill } from "react-icons/ri";

function App() {
  const [ques, setQues] = useState("");
  const [ans, setAns] = useState("");
  const [loading, setLoading] = useState(false);
  const [bgColor, setBgColor] = useState('white');

  useGSAP(() => {
    gsap.fromTo(
      '#answer',
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
        rotation: 0,
      },
      {
        opacity: 1,
        y: 0, // back to original position
        scale: 1, // scale to normal
        rotation: 0, // End rotated back to normal
        duration: 1.5, // Duration of the animation
        delay: 0.8, // Delay before the animation starts
        ease: 'bounce.out', // Adding easing for a more dynamic feel
        stagger: 0.2,
        onComplete: () => {
          console.log('Animation complete');
        },
      }
    );
  }, [ans]); // Trigger animation when `ans` changes

  function toggleBackground() {
    setBgColor(prevBgColor => (prevBgColor === 'white' ? 'black' : 'white'));
  }

  //we can't stop any function in btw or get readable code
  async function generateAnswer() {
    //initially ans ko time lgta hai load hone me to ..loading show krde

    setAns(""); //clear the prev ans
    setLoading(true); // Set loading to true before starting the API call

    const apiKey = import.meta.env.VITE_API_KEY; //since we use VITE and gemini api so import meta.env file from env

    try {
      //fetch bhi use kr skte hai jo ki inbuilt function hai api calls ke liye but 
      // in axios we get the server response automatically but in fetch hme fetch.json krke data parse krna hoga into a js obj
      const response = await axios({ // we use await because we are fething apikeys which will take time to respond
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        method: 'post',
        data: {
          "contents": [
            {
              "parts": [
                {
                  "text":
                    ques
                }
              ]
            }
          ]
        }
      });
      //now this is json response so we will have to go to each element to get the req ans
      // console.log(response['data']['candidates'][0]['content']['parts'][0]['text']);
      //instead of response in console we will be doing in frontend page
      setAns(response['data']['candidates'][0]['content']['parts'][0]['text']);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setAns("An error occurred while generating the answer.");
    } finally {
      setLoading(false); // Ensure loading is set to false after the API call completes hide krne hoga na
    }
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: bgColor === 'white' ? 'black' : 'white',
      }}
      className="d-flex flex-column align-items-center min-vh-100"
    >
      <div className="w-100 p-3 p-md-4">
        <button
          className="btn btn-secondary mb-4 position-fixed top-0 end-0 m-3"
          onClick={toggleBackground}
        >
          {bgColor === 'white' ? <FaMoon size={24} /> : <FaSun size={24} />}
        </button>
        <RiRobot3Fill
          style={{
            width: "40px",
            height: "40px",
            opacity: '0.6',
            color: 'blue',
          }}
        />
        <h1 id='sabot' className="text-center text-primary mb-4">SABOT AI</h1>
        <div className="mb-4 w-100 px-3">
          {/* You can choose between a textarea or input based on your preference
      <textarea 
        className="form-control overflow-hidden text-decoration none"
        value={ques}
        onChange={(e) => setQues(e.target.value)} // now when we write something it get's stored onChange
        cols="30"
        rows="1"
        placeholder='Ask Anything'
      ></textarea> */}
          <form>
            <input
              value={ques}
              onChange={(e) => setQues(e.target.value)}
              type="text"
              className="form-control form-control-lg shadow-sm mb-3"
              placeholder="Ask Anything"
              style={{ opacity: 1, backgroundColor: 'white' }}
            />
          </form>
          <button
            className="btn btn-primary btn-lg w-100 shadow-sm"
            onClick={generateAnswer}
          >
            Generate Answer
          </button>
        </div>
        <div
          className="p-3 rounded shadow-sm"
          style={{
            minHeight: '200px',
            backgroundColor: bgColor === '#333' ? '#444' : '#f8f9fa',
          }}
        >
          {loading ? (
            <Loading />
          ) : (
            //used pre here for proper ans line by line to avoid mesh
            <pre
              id="answer"
              className="answer m-0"
              style={{ color: bgColor === '#333' ? 'white' : 'black' }}
            >
              {ans}
            </pre>
          )}
        </div>
      </div>
      <small className="form-text text-muted">
        Inspired by Mahesh Dalla <BsAndroid2 className='d-inline-flex align-items-center' />
      </small>
      <div
        className='position-relative text-center p-3 w-100 rounded border border-white'
        style={{
          backgroundColor: bgColor === 'black' ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.5)',
        }}
      >
        &copy; {new Date().getFullYear()} Copyright{' '}
        <a className='text-white text-decoration-none'>
          SABOT AI
        </a>
      </div>
    </div>
  )
}

export default App
