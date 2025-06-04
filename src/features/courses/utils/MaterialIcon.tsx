import {
  BookOpenIcon,
  QuestionMarkCircleIcon,
  VideoCameraIcon,
} from "@heroicons/react/16/solid";

export default function getMateialIcon(type: string) {
  {
    if (type == "ARTICLE") return <BookOpenIcon />;
    else if (type == "VIDEO") return <VideoCameraIcon />;
    else return <QuestionMarkCircleIcon />;
  }
}
