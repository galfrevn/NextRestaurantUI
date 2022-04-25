import React from "react";
import {
  BiPhoneCall,
  BiMessageDetail,
  BiMailSend,
  BiBuilding,
} from "react-icons/bi";
import { AiOutlineFacebook , AiOutlineInstagram} from 'react-icons/ai'

export default function info({ isOpened }) {
  return (
    <div
      className={`${
        isOpened && "translate-x-2/3"
      } transition-all duration-300 bg-white p-6 relative z-40 flex flex-col text-customDark`}
    >
      <h3 className="text-sm font-semibold pt-2 ">Information</h3>
      <p className="mt-4 text-xs">
        This is a beta version, more features will be added soon! <br />
        This restaurant app was made by Valentín Galfré <br />
        Any feedback is welcome. <br />
      </p>

      <h3 className="text-sm font-semibold pt-2 mt-8">Contact information</h3>
      <ul className="mt-4 text-xs">
        <li className="flex items-center">
          <BiPhoneCall className="w-5 h-5 mr-2 text-accent" />
          <p>Tel: +34 567 890 123</p>
        </li>

        <li className="flex items-center mt-1">
          <BiMailSend className="w-5 h-5 mr-2 text-accent" />
          <p>Email: galfre.vn@gmail.com </p>
        </li>
        <li className="flex items-center mt-1">
          <BiBuilding className="w-5 h-5 mr-2 text-accent" />
          <p>Address: 7 de Marzo 1234 </p>
        </li>

        <hr className="my-8 text-customDark bg-customDark " />

        <h3 className="text-sm font-semibold ">Official social accounts </h3>
        <li className="flex items-center mt-4">
          <BiMessageDetail className="w-5 h-5 mr-2 text-accent" />
          <p>Whatsapp: +12 345 678 901</p>
        </li>
        <li className="flex items-center mt-1">
          <AiOutlineFacebook className="w-5 h-5 mr-2 text-accent" />
          <p>Facebook: VNRestaurant </p>
        </li>
        <li className="flex items-center mt-1">
          <AiOutlineInstagram className="w-5 h-5 mr-2 text-accent" />
          <p>Facebook: @vn.restaurant </p>
        </li>
      </ul>

      <img src="/assets/delivery.webp" className="mt-8" alt="" />

    </div>
  );
}
