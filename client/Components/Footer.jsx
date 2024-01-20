
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';


export default function Footer() {
return(<MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
<section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>

</section>

<section className=''>
  <MDBContainer className='text-center text-md-start mt-5'>
    <MDBRow className='mt-1'>
      <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
        <h6 className='text-uppercase fw-bold mb-4'>
          <MDBIcon icon="gem" className="me-3" />
          PatchCare Counseling
        </h6>
        <p>
          
        </p>
      </MDBCol>

      <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
        <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
        <p>
          <MDBIcon icon="home" className="me-2" />
          Koura, Fii 10012, LB
        </p>
        <p>
          <MDBIcon icon="envelope" className="me-3" /> patchcareconseling@gmail.com

        </p>
        <p>
          <MDBIcon icon="phone" className="me-3" /> + 961 79 169 758
        </p>
        <p>
          <MDBIcon icon="print" className="me-3" /> + 961 26 690 305
        </p>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</section>

<div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
  © 2023 Copyright:
  <a className='text-reset fw-bold' href='https://patchcare.org/'>
    PatchCare.org
  </a>
</div>
</MDBFooter>);
}
 