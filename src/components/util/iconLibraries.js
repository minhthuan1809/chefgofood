/* eslint-disable no-undef */
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as CiIcons from "react-icons/ci";
import * as DiIcons from "react-icons/di";
import * as FiIcons from "react-icons/fi";
import * as GiIcons from "react-icons/gi";
import * as GoIcons from "react-icons/go";
import * as GrIcons from "react-icons/gr";
import * as HiIcons from "react-icons/hi";
import * as ImIcons from "react-icons/im";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as TiIcons from "react-icons/ti";
import * as VscIcons from "react-icons/vsc";
import * as WiIcons from "react-icons/wi";
import PropTypes from "prop-types";
import React from "react";

export const IconLibraries = {
  Fa: FaIcons,
  Ai: AiIcons,
  Bi: BiIcons,
  Bs: BsIcons,
  Ci: CiIcons,
  Di: DiIcons,
  Fi: FiIcons,
  Gi: GiIcons,
  Go: GoIcons,
  Gr: GrIcons,
  Hi: HiIcons,
  Im: ImIcons,
  Io: IoIcons,
  Io5: Io5Icons,
  Md: MdIcons,
  Ri: RiIcons,
  Si: SiIcons,
  Ti: TiIcons,
  Vsc: VscIcons,
  Wi: WiIcons,
};

export const DynamicIcon = ({ iconName, size = 24, className }) => {
  if (!iconName) return null;

  const libraryPrefix = iconName.slice(0, 2);
  const IconLibrary = IconLibraries[libraryPrefix];

  if (!IconLibrary) return null;

  const IconComponent = IconLibrary[iconName];
  return IconComponent
    ? React.createElement(IconComponent, { size, className })
    : null;
};

DynamicIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};
