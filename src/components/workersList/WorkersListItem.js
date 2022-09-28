import ReactTooltip from 'react-tooltip';
import { formatPhone } from '../../utils/helpers';
import defaultImg from '../../assets/img/defaul-img.png'

const WorkersListItem = ({photo, name, position, email, phone}) => {

	return (
		<div  className="workers__item">
			<img 
				src={photo || defaultImg} 
				alt="worker" 
				className="workers__item-img" 
				onError={({currentTarget}) => {
					currentTarget.src = defaultImg;
				}}
			/>
			<h4 className="workers__item-name">{name}</h4>
			<p className="workers__item-position">{position}</p>
			<ReactTooltip 
				place='bottom' 
				arrowColor='inherit' 
				className='workers__item-tooltip'
			/>
			<a 
				data-tip={email} 
				href={`mailto:${email}`} 
				className="workers__item-email">
					{email}
			</a>
			<a 
				href={`tel:${phone}`} 
				className="workers__item-phone">
					{formatPhone(phone)}
			</a>
		</div>  
	)
}

export default WorkersListItem