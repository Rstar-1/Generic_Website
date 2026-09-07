import React from 'react';
import counterBg from '../../../assets/counter-bg.jpg';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';

const stats = [
    {
        id: 1,
        value: '30',
        symbol: '+',
        label: 'Personalization At Seems Ultimate Scale.'
    },
    {
        id: 2,
        value: '8K',
        symbol: '+',
        label: 'Personalization At Seems Ultimate Scale.'
    },
    {
        id: 3,
        value: '20',
        symbol: 'X',
        label: 'Personalization At Seems Ultimate Scale.'
    }
];

const PatchSection = () => {
    return (
        <Container
            className="relative z-10"
            style={{
                background: `linear-gradient(90deg, rgba(10, 15, 25, 0.94) 0%, rgba(10, 15, 25, 0.82) 50%, rgba(10, 15, 25, 0.45) 100%), url(${counterBg}) center/cover no-repeat`,
                backgroundAttachment: 'fixed',
                backgroundPosition: 'bottom'
            }}
        >
            <div className='w-full py-100 sm-py-50'>
                <div className="w-50 sm-w-full">
                    <p className="mini-text text-dark bg-white w-max px-18 py-6 rounded-20 flex items-center gap-8 font-600 uppercase mb-18">
                        <Icon name="Settings" width="14" height="14" className="text-primary" />
                        NO.1 SOFTWARE COMPANY COMPANY
                    </p>
                    <h3 className='text-white large-text font-600'>
                        Delivering Innovative IT solutions Empower In Businesses.
                    </h3>

                    <p className='text-white para-text text-muted font-400 mt-18 sm-mt-6'>
                        Empowering enterprises with tailored financial insights and measurable growth strategies.
                    </p>
                </div>

                {/* <div className='mt-60 bordh grid-cols-3 sm-grid-cols-2 justify-center gap-12 pt-30'>
                    {stats.map((item) => (
                        <div className='mx-auto' key={item.id}>
                            <h3 className='largehead-text text-white font-600 text-center sm-text-left'>
                                {item.value}<sup className='font-500'>{item.symbol}</sup>
                            </h3>
                            <p className='para-text text-white font-400 w-90 sm-w-full mt-6 mx-auto text-center sm-text-left'>
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div> */}
            </div>
        </Container>
    );
};

export default PatchSection;
