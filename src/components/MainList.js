import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function MainList({ newLead }) {

    const [leads, setLeads] = useState([]);
    const [logedUser, setLogedUser] = useState('');

    const fetchLeads = () => {
        axios.get('http://localhost:5000/lead/')
            .then(res => {
                setLeads(res.data);
            })
    }

    useEffect(() => {
        if (newLead) {
            const array = leads
            array.push(newLead)
            setLeads([...array]);
        }
    }, [newLead])

    useEffect(() => {
        const data = localStorage.getItem('logged-in-user')
        if (data) {
            const temp = JSON.parse(data);
            setLogedUser(temp.username);
        }

        fetchLeads();
    }, [])

    const onDeleteClicked = (leadId) => {
        axios.delete(`http://localhost:5000/lead/${leadId}`)
            .then(res => {
                const objIndex = leads.findIndex((obj) => obj._id === leadId);
                const array = leads
                array.splice(objIndex, 1);
                setLeads([...array]);
            });
    }

    const toggleConversion = (leadId, e) => {
        if (e.target.checked) {
            const lead = {
                conversionStatus: true
            }
            axios.patch(`http://localhost:5000/lead/${leadId}`, lead)
                .then(res => {
                    const objIndex = leads.findIndex((obj) => obj._id === leadId);
                    const array = leads
                    array[objIndex].conversionStatus = true;
                    setLeads([...array]);
                })
        }
        else {
            const lead = {
                conversionStatus: false
            }
            axios.patch(`http://localhost:5000/lead/${leadId}`, lead)
                .then(res => {
                    const objIndex = leads.findIndex((obj) => obj._id === leadId);
                    const array = leads
                    array[objIndex].conversionStatus = false;
                    setLeads([...array]);
                })
        }
    }

    const toggleBroadcast = (leadId, e) => {
        if (e.target.checked) {
            const lead = {
                broadcastStatus: true
            }
            axios.patch(`http://localhost:5000/lead/${leadId}`, lead)
                .then(res => {
                    const objIndex = leads.findIndex((obj) => obj._id === leadId);
                    const array = leads
                    array[objIndex].broadcastStatus = true;
                    setLeads([...array]);
                })
        }
        else {
            const lead = {
                broadcastStatus: false
            }
            axios.patch(`http://localhost:5000/lead/${leadId}`, lead)
                .then(res => {
                    const objIndex = leads.findIndex((obj) => obj._id === leadId);
                    const array = leads
                    array[objIndex].broadcastStatus = false;
                    setLeads([...array]);
                })
        }
    }

    return (
        <div>
            <h3 className="mt-3">Main List</h3>
            {
                leads.length > 0 &&
                <ul className="list-group">
                    {
                        leads.map(lead =>
                            (lead.createdBy === logedUser) ?
                                <li className={`${lead.conversionStatus ? "list-group-item list-group-item-success" : "list-group-item"}`}>
                                    <div className="row">
                                        <div className="col-auto">
                                            <strong>Lead Name: </strong>{lead.name}
                                        </div>
                                        <div className="col-auto">
                                            <strong>Lead Company: </strong>{lead.company}
                                        </div>
                                        <div className="col-auto ms-auto">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={(e) => toggleConversion(`${lead._id}`, e)} checked={lead.conversionStatus} />
                                                <label class="form-check-label" for="flexSwitchCheckChecked">Conversion Status</label>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked2" onChange={(e) => toggleBroadcast(`${lead._id}`, e)} checked={lead.broadcastStatus} />
                                                <label class="form-check-label" for="flexSwitchCheckChecked">Broadcast Status</label>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDeleteClicked(lead._id)}>
                                                delete
                                            </button>
                                        </div>

                                    </div>
                                </li>
                                : null)
                    }
                </ul>
            }

            <h3 className="mt-3">Broadcast List</h3>
            {
                leads.length > 0 &&
                <ul className="list-group mb-3">
                    {
                        leads.map(lead =>
                            (lead.broadcastStatus === true) ?
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-auto">
                                            <strong>Lead Name: </strong>{lead.name}
                                        </div>
                                        <div className="col-auto">
                                            <strong>Lead Company: </strong>{lead.company}
                                        </div>
                                    </div>
                                </li>
                                : null)
                    }
                </ul>
            }

        </div>
    )
}
