import React from 'react';
import './ResponseBody.css';

export default function ResponseBody ({ response, onDrillDown }) {
    const [ mode, setMode ] = React.useState("plain");

    if (!response) {
        return null;
    }

    const availableModes = [ "plain" ];

    const type = getHeader(response.headers, "Content-Type");
    if (type === "application/json") {
        availableModes.push("json");
    }

    return (
        <div>
            {
                availableModes.map(am => <button key={am} className="ResponseBody-mode" style={am === mode ? { outline: "1px solid blue" } : null} onClick={()=>setMode(am)}>{am}</button>)
            }
            { mode === "plain" && <code>{response.body}</code> }
            { mode === "json" && <JSONBody onDrillDown={onDrillDown}>{response.body}</JSONBody> }
        </div>
    );
}

function JSONBody ({ children, onDrillDown }) {
    if (!children) return null;

    try {
        const data = JSON.parse(children);

        return formatObject(data, { onDrillDown });

    } catch(e) {
        console.log(e);
        return null;
    }
}

function formatObject (object, { key=null, onDrillDown=null }) {
    if (Array.isArray(object)) {
        return (
            <div key={key}>
                <p>{`Array of ${object.length} items`}</p>
                { object.map((d,i) => formatObject(d, { key: i, onDrillDown })) }
            </div>
        );
    }

    if (typeof object === "object") {
        return (
            <dl key={key} className="JSONBody-object">
                {
                    Object.entries(object).map(([k,v], i) => {
                        const isID = k === "id" && typeof v === "number" && key !== null && onDrillDown !== null;
                        const onClick = isID ? () => onDrillDown(v) : () => void 0;
                        return (
                            <Fragment key={i}>
                                <dt>{k}</dt>
                                <dd onClick={onClick} style={isID ? { cursor: "pointer" } : null}>
                                    {formatObject(v, onDrillDown)}
                                </dd>
                            </Fragment>
                        );
                    })
                }
            </dl>
        )
    }

    if (typeof object === "boolean") {
        return <div key={key} className={`JSONBody-boolean`}>{object?"true":"false"}</div>;
    }

    return <div key={key} className={`JSONBody-${typeof object}`}>{object}</div>;
}

/**
 * 
 * @param {[string,string[]]} headers 
 * @param {string} key 
 */
function getHeader(headers, key) {
    const found = headers.find(h => h[0].toLowerCase() === key.toLowerCase());
    return found ? found[1] : null;
}

function Fragment ({ children }) {
    return children;
}