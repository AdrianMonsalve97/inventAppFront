import api from '../config/api';

export const getCompanies = async () => {
    const response = await api.get('/empresas');
    return response.data;
};

interface CompanyData {
    name: string;
    address: string;

}

export const createCompany = async (companyData: CompanyData) => {
    const response = await api.post('/empresas', companyData);
    return response.data;
};