import { ipcRenderer } from 'electron';
import React from 'react';
import Input from '../components/Input';
import RecordsTableSection from '../components/RecordsTableSection';
import SearchFormSection from '../components/SearchFormSection';

class AdministrationView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      datetimeStart: '',
      datetimeEnd: '',
      provider: '',
      medication: '',
      medicationOrderId: '',
      records: [],
      sortColumn: '',
      sortDirection: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;

    if (target.tagName === 'SELECT') {
      const values = [...target.selectedOptions].map(option => option.value);
      this.setState({ [target.name]: values });
    } else {
      this.setState({ [target.name]: target.value });
    }
  }

  handleClick(event) {
    if (this.state.records.length === 0) {
      return;
    }

    const targetSortColumn = event.target.dataset.sortColumn;

    this.setState(state => {
      const records = [...state.records];

      if (targetSortColumn !== this.state.sortColumn) {
        records.sort((recordA, recordB) => {
          if (typeof recordA[targetSortColumn] === 'number') {
            return recordA[targetSortColumn] - recordB[targetSortColumn];
          }

          const recordAString = recordA[targetSortColumn]
            ? recordA[targetSortColumn].toLowerCase()
            : '';

          const recordBString = recordB[targetSortColumn]
            ? recordB[targetSortColumn].toLowerCase()
            : '';

          if (recordAString > recordBString) {
            return 1;
          }

          if (recordAString < recordBString) {
            return -1;
          }

          return 0;
        });

        return {
          sortColumn: targetSortColumn,
          sortDirection: 'ASC',
          records,
        };
      }

      if (state.sortDirection === 'ASC') {
        return {
          sortDirection: 'DESC',
          records: records.reverse(),
        };
      }

      return {
        sortDirection: 'ASC',
        records: records.reverse(),
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.datetimeStart || !this.state.datetimeEnd) {
      return;
    }

    ipcRenderer.send('database', {
      header: {
        type: 'administration',
        response: 'administration',
      },

      body: {
        datetimeStart: this.state.datetimeStart,
        datetimeEnd: this.state.datetimeEnd,
        provider: this.state.provider,
        medication: this.state.medication,
        medicationOrderId: this.state.medicationOrderId,
      },
    });

    ipcRenderer.once('administration', (event, data) =>
      this.setState({ records: data.body, sortColumn: '', sortDirection: '' })
    );
  }

  render() {
    const columnHeadings = [
      {
        name: 'Time',
        sortColumn: 'timestamp',
      },
      {
        name: 'Provider',
        sortColumn: 'provider',
      },
      {
        name: 'Medication',
        sortColumn: 'medication',
      },
      {
        name: 'Dose',
        sortColumn: 'dose',
      },
      {
        name: 'Order ID',
        sortColumn: 'medicationOrderId',
      },
    ];

    const tableBodyRows =
      this.state.records.length > 0 ? (
        this.state.records.map(record => {
          return (
            <tr key={record.id}>
              <td className="border-right">
                {new Date(record.timestamp).toLocaleString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  hour12: false,
                })}
              </td>
              <td className="border-right">{record.provider}</td>
              <td className="border-right">{record.medication}</td>
              <td className="border-right">{record.dose}</td>
              <td className="border-right">{record.medicationOrderId}</td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td className="font-italic text-center border-right" colSpan={5}>
            No records found!
          </td>
        </tr>
      );

    return (
      <React.Fragment>
        <div className="row flex-shrink-0">
          <header className="col">
            <h1 className="text-center">Administrations</h1>
          </header>
        </div>
        <div className="row">
          <SearchFormSection handleSubmit={this.handleSubmit}>
            <Input
              type="datetime-local"
              name="datetimeStart"
              value={this.state.datetimeStart}
              label="Time start"
              handleChange={this.handleChange}
              info="Required"
              attributes={{
                max: '9999-12-31T23:59',
                required: true,
              }}
            />
            <Input
              type="datetime-local"
              name="datetimeEnd"
              value={this.state.datetimeEnd}
              label="Time end"
              handleChange={this.handleChange}
              info="Required"
              attributes={{
                max: '9999-12-31T23:59',
                required: true,
              }}
            />
            <Input
              type="text"
              name="provider"
              value={this.state.provider}
              label="Provider"
              handleChange={this.handleChange}
            />
            <Input
              type="text"
              name="medication"
              value={this.state.medication}
              label="Medication"
              handleChange={this.handleChange}
            />
            <Input
              type="text"
              name="medicationOrderId"
              value={this.state.medicationOrderId}
              label="Order ID"
              handleChange={this.handleChange}
            />
          </SearchFormSection>
          <RecordsTableSection
            sortColumn={this.state.sortColumn}
            sortDirection={this.state.sortDirection}
            columnHeadings={columnHeadings}
            tableBodyRows={tableBodyRows}
            handleClick={this.handleClick}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default AdministrationView;
