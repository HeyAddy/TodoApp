import React, { useState } from "react";

export const App = () => {
  const [inputData, SetinputData] = useState();
  const [items, SetItems] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const inputHandler = (e) => {
    let val = e.target.value;
    SetinputData(val);
  };

  const addItems = () => {
    if (!inputData) {
      alert("No Data Found");
    } else if (inputData && !toggle) {
      SetItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggle(true);

      SetinputData("");

      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toLocaleString(),
        name: inputData,
      };
      SetItems([...items, allInputData]);
      SetinputData("");
    }
  };

  const deleteItems = (id) => {
    const updateItems = items.filter((elem) => {
      return elem.id !== id;
    });

    SetItems(updateItems);
  };

  const removeAll = () => {
    SetItems([]);
  };
  const editItems = (id) => {
    const editData = items.find((elem) => {
      return id === elem.id;
    });
    // console.log(editData);
    setToggle(false);

    SetinputData(editData.name);

    setIsEditItem(id);
  };
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img
              src={process.env.PUBLIC_URL + "images/todo.svg"}
              alt="todologo"
            />
            <figcaption>Add Your List Here 👌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Items..."
              onChange={inputHandler}
              value={inputData}
            />

            {toggle ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Items"
                onClick={addItems}
              ></i>
            ) : (
              <i
                className="far fa-edit add-btn"
                title="Edit Items"
                onClick={addItems}
              ></i>
            )}
          </div>

          {items.map((elem) => {
            return (
              <div className="showItems" key={elem.id}>
                <div className="eachItem">
                  <h3>{elem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      title="Edit Items"
                      onClick={() => {
                        editItems(elem.id);
                      }}
                    ></i>

                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Items"
                      onClick={() => {
                        deleteItems(elem.id);
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
