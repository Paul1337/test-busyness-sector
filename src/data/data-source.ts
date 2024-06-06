import { DataSource } from 'typeorm';
import { getTypeormConfig } from './typeorm.config';

export const dataSource = new DataSource(getTypeormConfig());
dataSource
    .initialize()
    .then(() => {
        console.log('Datasource init');
    })
    .catch(error => console.log(error));
