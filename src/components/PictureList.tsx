import React from "react";

interface PictureListProps {
  list: File[];
}

const PictureList: React.FC<PictureListProps> = ({ list }) => {
  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item?.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PictureList;
