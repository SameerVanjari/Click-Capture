import React from "react";

interface PictureListProps {
  list: any[];
}

const PictureList: React.FC<PictureListProps> = ({ list }) => {
  return (
    <div>
      <ul>
        {list.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PictureList;
