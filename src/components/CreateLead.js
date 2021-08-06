import React, { useState } from 'react'
import axios from 'axios';

export default function CreateLead() {

    const [leadName, setLeadName] = useState('');
    const [leadCompany, setLeadCompany] = useState('');
    const [leadDomain, setLeadDomain] = useState('');
    const [conversionStatus, setConversionStatus] = useState(false);
    const [broadcastStatus, setBroadcastStatus] = useState(false);
    const [createdBy, setCreatedBy] = useState('');

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
        e.persist()

        if (e.target.value === 'true') {
            setConversionStatus(true);
        }
        else {
            setConversionStatus(false);
        }
    }
    const onBroadcastChange = (e) => {
        e.persist()

        if (e.target.value === 'true') {
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
                        <label>Conversion Status</label>
                        <div className="row">
                            <div className="col-auto" onChange={onConversionChange}>
                                <div>
                                    <input type="radio" value="true" name="conversion" /> Converted
                                </div>
                                <div>
                                    <input type="radio" value="false" name="conversion" checked /> Not Converted
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-3 form-group mt-3">
                        <label>Broadast Status</label>
                        <div className="row">
                            <div className="col-auto" onChange={onBroadcastChange}>
                                <div>
                                    <input type="radio" value="true" name="broadcast" /> Yes
                                </div>
                                <div>
                                    <input type="radio" value="false" name="broadcast" checked /> No
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
