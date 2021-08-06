import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function CreateLead(props) {

    const [leadName, setLeadName] = useState('');
    const [leadCompany, setLeadCompany] = useState('');
    const [leadDomain, setLeadDomain] = useState('');
    const [conversionStatus, setConversionStatus] = useState(false);
    const [broadcastStatus, setBroadcastStatus] = useState(false);
    const [createdBy, setCreatedBy] = useState('');

    useEffect(() => {
        const temp = localStorage.getItem('logged-in-user');
        const data = JSON.parse(temp);
        setCreatedBy(data.username);

        // eslint-disable-next-line
    }, [])

    const onChangeLeadName = (e) => {
        setLeadName(e.target.value);
    }

    const onChangeLeadCompany = (e) => {
        setLeadCompany(e.target.value);
    }

    const onChangeLeadDomain = (e) => {
        setLeadDomain(e.target.value);
    }

    const onChangeCreatedBy = (e) => {
        setCreatedBy(e.target.value);
    }

    const onConversionChange = (e) => {
        if (e.target.checked) {
            setConversionStatus(true);
        }
        else {
            setConversionStatus(false);
        }
    }
    const onBroadcastChange = (e) => {
        if (e.target.checked) {
            setBroadcastStatus(true);
        }
        else {
            setBroadcastStatus(false);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const lead = {
            name: leadName,
            company: leadCompany,
            domain: leadDomain,
            conversionStatus: conversionStatus,
            broadcastStatus: broadcastStatus,
            createdBy: createdBy,
        }

        axios.post('http://localhost:5000/lead/create', lead)
            .then(res => {
                console.log(res.data);
            })

        props.parentCallback(lead);
    }

    return (
        <div>
            <h3 className="mt-3">Create Lead</h3>
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-3 form-group mt-3">
                        <label>Lead Name</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={leadName}
                            onChange={onChangeLeadName}
                        />
                    </div>

                    <div className="col-3 form-group mt-3">
                        <label>Lead Company</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={leadCompany}
                            onChange={onChangeLeadCompany}
                        />
                    </div>
                    <div className="col-3 form-group mt-3">
                        <label>Lead Domain</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={leadDomain}
                            onChange={onChangeLeadDomain}
                        />
                    </div>
                    <div className="col-3 form-group mt-3">
                        <label>Created By</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={createdBy}
                            onChange={onChangeCreatedBy}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3 form-group mt-3">
                        <div className="row">
                            <div className="col-auto">
                            <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchConversion" onChange={onConversionChange} />
                                    <label class="form-check-label" for="flexSwitchConversion">Cconversion Status</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-3 form-group mt-3">
                        <div className="row">
                            <div className="col-auto">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchBroadcast" onChange={onBroadcastChange} />
                                    <label class="form-check-label" for="flexSwitchBroadcast">Broadcast Status</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col form-group mt-3">
                        <input type="submit" value="Create Lead" className="btn btn-primary" />
                    </div>
                </div>

            </form>
        </div>
    )
}
