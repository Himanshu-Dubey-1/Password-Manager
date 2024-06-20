import { useEffect, useState } from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    alert("copied to clipboard " + text);
    navigator.clipboard.writeText(text);
  };
 
  const savePassword = () => {
    if (form.site!=="" && form.username!=="" && form.password!=="") {
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );

    setform({ site: "", username: "", password: "" })
    } else {
        alert("you haven't filled all the details yet")
    }
    
  };


  const deletePassword = (id) => {
    let c = confirm("Your Password Will Be Deleted Permanently")
    if (c) {
      setpasswordArray(passwordArray.filter(item=>item.id!==id));
     localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    }  
  };


  const editPassword = (id) => {
     setform(passwordArray.filter(item=>item.id===id)[0])
     setpasswordArray(passwordArray.filter(item=>item.id!==id));
   
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="md:py-0 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-600">&lt;</span>Pass
          <span className="text-green-600">op/&gt;</span>
        </h1>
        <p className="text-green-900 text-center text-lg">
          Your Own Password Manager
        </p>

        {/* this div contains input boxes and add password buttton and there
        styles */}

        <div className=" flex flex-col p-4 text-black gap-3 items-center">
          <input
            className="rounded-full border border-green-500 w-full px-4 py-1"
            type="text"
            placeholder="Enter Website URL"
            value={form.site}
            onChange={handleChange}
            name="site"
            id=""
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-3">
            <input
              className="rounded-full border border-green-500 w-full px-4 py-1"
              type="text"
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
              name="username"
              id=""
            />
            <input
              className="rounded-full border border-green-500 w-full px-4 py-1"
              type="text"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              name="password"
              id=""
            />
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-500 rounded-full
          px-4 py-2 border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        {/* This div contains MAP function and table format */}

        <div className="passwords">
          <h2 className="font-bold text-center py-4">Your Passwords</h2><hr />
          {passwordArray.length === 0 && <div className="flex items-center justify-center text-2xl">No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-50">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/smwmetfi.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/smwmetfi.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/smwmetfi.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div className="flex items-center justify-center gap-4 cursor-pointer">
                          <span className="border rounded-full border-gray-700 px-3 hover:text-green-400" 
                          onClick={()=>{editPassword(item.id)}}>
                            Edit
                          </span>
                          <span onClick={()=>{deletePassword(item.id)}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/wpyrrmcq.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default manager;
