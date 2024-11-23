import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { createGroupContext } from "../../../../Context";
import axios from "axios";
import { motion } from "framer-motion";
import useSWR from "swr";
import Lottie from "lottie-react";
import loaderBook from "../../../../assets/loaderbook.json";
import { DemandButton, DemandCard, LikeDislikeButons } from './demandComponents'
import moment from 'moment'



export const GroupDemand: React.FC = () => {
  const groupId = localStorage.getItem("groupId") as string;
  const {setDemand } = useContext<any>(createGroupContext);

  const { data, error } = useSWR<any[]>(
    `https://notes-lelo-app-backend.vercel.app/api/v1/demand/demands/${groupId}`,
    async (url: string) => {
      try {
        const resp = await axios.get(url);
        return resp.data.data;
      } catch (error) {
        console.log(">>>>>>>>>>>", error);
        throw error;
      }
    }
  );


  if (error) {
    console.log("Error fetching data:", error);
    return (
      <div className="text-white p-5 font-semibold text-lg">
        Error fetching data. Please try again later.🤖
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-[80vh] w-full justify-center items-center">
        <Lottie className="h-[5rem]" animationData={loaderBook} loop={true} />
      </div>
    );
  }

  return (
    <>
      <div
        className="demandContent flex flex-col gap-5 overflow-y-scroll no-scrollbar w-full h-[calc(100vh-10.15rem)] py-3 pt-[3rem] px-6"
      >
        <DemandCard data={data} />
        <DemandButton setDemand={setDemand} />

      </div>
    </>
  );
};
