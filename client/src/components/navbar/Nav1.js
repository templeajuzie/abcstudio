'use client'

import Link from "next/link";
import React from "react";

const Nav1 = () => {
  return (
    <div className="flex flex-row items-center justify-between px-4  w-full shadow-md h-8  bg-[#141e33] py-6 lg:px-14">
      <div className="">
        <span className="text-xs text-white md:text-sm">#1 CUSTOMER SERVICE 24/7,  +1(240) 486-8768</span>
      </div>

      <div className="">
        <Link
          href="/donate"
          className="flex flex-row items-baseline gap-1 px-1 items"
        >
          <svg
            height="25px"
            width="25px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 511.999 511.999"
            xmlSpace="preserve"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                style={{ fill: "#ffffff" }}
                d="M457.246,476.261H123.109c-21.42,0-41.994-10.142-55.041-27.13l-57.491-74.863 c-1.939-2.525-2.982-5.623-2.963-8.806l0.328-56.891c0.046-7.879,6.447-14.24,14.323-14.24c0.013,0,0.024,0,0.037,0 c16.997,0.044,41.367,0.12,60.942,0.239c8.637,0.052,15.951,0.109,21.125,0.173c11.003,0.135,13.96,0.17,18.186,4.387l84.293,84.293 c9.738,9.738,25.582,9.738,35.32,0l0.127-0.127c9.737-9.737,9.737-25.582,0-35.32l-78.822-77.56 c-9.449-9.298-21.954-14.419-35.209-14.419H14.323C6.412,255.998,0,249.586,0,241.675c0-7.91,6.412-14.323,14.323-14.323h113.94 c20.822,0,40.462,8.042,55.301,22.647l78.902,77.64c20.988,20.988,20.988,55.005,0.083,75.912l-0.126,0.126 c-20.908,20.907-54.925,20.907-75.831,0l-80.264-80.264c-9.036-0.129-30.615-0.278-69.823-0.398l-0.218,37.7l54.499,70.967 c7.661,9.976,19.744,15.933,32.322,15.933h334.137c13.771,0,24.976-11.203,24.976-24.976v-0.179 c0-13.771-11.203-24.976-24.976-24.976H319.006c-7.91,0-14.323-6.412-14.323-14.323s6.412-14.323,14.323-14.323h138.238 c29.566,0,53.621,24.054,53.621,53.621v0.179C510.867,452.207,486.812,476.261,457.246,476.261z"
              />{" "}
              <circle
                style={{ fill: "#CEE8FA" }}
                cx="363.596"
                cy="184.132"
                r="134.075"
              />{" "}
              <g>
                {" "}
                <path
                  style={{ fill: "#ffffff" }}
                  d="M363.601,332.534c-81.827,0-148.399-66.57-148.399-148.399c0-81.827,66.57-148.397,148.399-148.397 c81.827,0,148.397,66.57,148.397,148.397C512,265.964,445.428,332.534,363.601,332.534z M363.601,64.383 c-66.032,0-119.753,53.72-119.753,119.752s53.722,119.753,119.753,119.753s119.752-53.722,119.752-119.753 S429.633,64.383,363.601,64.383z"
                />{" "}
                <path
                  style={{ fill: "#ffffff" }}
                  d="M358.087,255.922c-24.062-0.802-43.713-13.234-43.713-26.067c0-6.818,6.016-16.843,13.635-16.843 c8.422,0,15.239,11.831,30.078,14.437v-32.484c-18.448-7.018-40.104-15.64-40.104-41.307c0-25.466,18.849-37.697,40.104-40.704 v-5.614c0-2.807,3.208-5.414,7.62-5.414c3.81,0,7.62,2.607,7.62,5.414v5.013c12.432,0.401,35.893,3.609,35.893,17.445 c0,5.414-3.609,16.442-12.432,16.442c-6.617,0-10.427-6.417-23.461-7.419v29.276c18.247,6.818,39.502,16.242,39.502,43.312 c0,24.864-16.041,39.903-39.502,43.713v5.815c0,2.807-3.81,5.414-7.62,5.414c-4.411,0-7.62-2.607-7.62-5.414V255.922z M360.092,163.283v-23.862c-9.023,1.805-12.833,6.417-12.833,11.229C347.259,156.465,352.473,160.075,360.092,163.283z M371.321,200.379v26.869c6.818-1.604,12.232-5.414,12.232-12.633C383.553,207.998,378.54,203.787,371.321,200.379z"
                />{" "}
              </g>{" "}
            </g>
          </svg>
          <span className="text-white">Donate</span>
        </Link>
      </div>
    </div>
  );
};

export default Nav1;
