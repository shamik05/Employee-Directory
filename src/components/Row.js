import Image from "next/image";

// Row component that renders employee details given an employee object
const Row = ({
  image, name, phone, email, dob,
}) => {
  return (
    <tr>
      <td
        ><Image 
          src={image} 
          alt="Employee thumbnail" 
          width={100} 
          height={100}
          loading="lazy"
        /></td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{dob}</td>
    </tr>
  );
}

// Export the component
export default Row;
