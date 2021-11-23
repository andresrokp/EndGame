export { default as ProfileForm } from './ProfileForm';

// ----------------------------practica clase ------------------------------------------
// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_USERS } from 'graphql/user/queries';
// import { Link } from 'react-router-dom';
// import { Enum_Rol } from 'utils/enums';

// const Users = () => {
//   const { loading, error, data } = useQuery(GET_USERS);

//   if (loading) return <div>Loading...</div>;

//   if (error) return <div>Error...</div>;

//   console.log(data);

//   return (
//     <div>
//       Users data:
//       <table className="tabla">
//         <thead>
//           <tr>
//             <th>firstName</th>
//             <th>lastName</th>
//             <th>Email</th>
//             <th>Identification</th>
//             <th>Role</th>
//             <th>Edit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data &&
//             data.Usuarios.map((u) => {
//               return (
//                 <tr key={u._id}>
//                   <td>{u.firstName}</td>
//                   <td>{u.lastName}</td>
//                   <td>{u.email}</td>
//                   <td>{u.identification}</td>
//                   <td>{Enum_Role[u.role]}</td>
//                   <td>
//                     <Link to={`/usuarios/editar/${u._id}`}>
//                       <i className="fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer" />
//                     </Link>
//                   </td>
//                 </tr>
//               );
//             })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Users;
