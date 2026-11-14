export const NAV_LEARN = [
  { to: '/fundamentals', label: 'Road Safety Fundamentals', who: 'sam' },
  { to: '/traffic-rules', label: 'Traffic Rules', who: 'ravi' },
  { to: '/helmet-seatbelt', label: 'Helmet and Seatbelt', who: 'arjun' },
  { to: '/pedestrian-safety', label: 'Pedestrian Safety', who: 'riya' },
  { to: '/traffic-signals', label: 'Traffic Signals', who: 'ravi' },
  { to: '/accident-prevention', label: 'Accident Prevention', who: 'sam' },
  { to: '/road-conditions', label: 'Different Conditions', who: 'arjun' },
  { to: '/inclusive-safety', label: 'Inclusive Safety', who: 'riya' },
]
export const EXPLORE = [
  { to: '/traffic-signs', title: 'Traffic Signs', text: 'Learn what each sign means and what to do.', sign: 'stop', color: 'bg-coral/40' },
  { to: '/traffic-rules', title: 'Traffic Rules', text: 'Simple rules for walkers, cyclists, riders and drivers.', who: 'ravi', color: 'bg-sun' },
  { to: '/pedestrian-safety', title: 'Pedestrian Safety', text: 'Cross roads the smart way.', who: 'riya', color: 'bg-mint' },
  { to: '/helmet-seatbelt', title: 'Helmet and Seatbelt', text: 'Your best protection on every trip.', who: 'arjun', color: 'bg-sky' },
  { to: '/traffic-signals', title: 'Traffic Signals', text: 'Red, yellow, green and police signals.', light: true, color: 'bg-lav' },
  { to: '/accident-prevention', title: 'Accident Prevention', text: 'Habits that stop crashes before they happen.', sign: 'crossing', color: 'bg-sun' },
  { to: '/emergency-help', title: 'Emergency Help', text: 'What to do when you see an accident.', sign: 'firstAid', color: 'bg-mint' },
  { to: '/myths-vs-facts', title: 'Myths vs Facts', text: 'Flip the cards. Spot the truth.', who: 'sam', color: 'bg-coral/40' },
]
export const TIPS = [
  { who: 'arjun', t: 'Always wear a properly fitted helmet, even for short journeys.' },
  { who: 'riya', t: 'Cross only at zebra crossings, and look right, left, then right again.' },
  { who: 'sam', t: 'Buckle up in the back seat too. Every seat needs a seatbelt.' },
  { who: 'ravi', t: 'Never use a phone while riding or driving. Pull over to a safe place first.' },
  { who: 'sam', t: 'Keep a safe gap from the vehicle ahead so you have time to stop.' },
  { who: 'riya', t: 'Wait for a school bus to stop fully before you step off or cross.' },
  { who: 'arjun', t: 'Use lights and reflectors on your bicycle after sunset.' },
  { who: 'ravi', t: 'A yellow light means get ready to stop, not speed up.' },
]
export const STATS = [
  { n: '4,61,312', l: 'road accidents reported in India', y: '2022', s: 'MoRTH, Road Accidents in India 2022' },
  { n: '1,68,491', l: 'people lost their lives on roads', y: '2022', s: 'MoRTH, Road Accidents in India 2022' },
  { n: '4,43,366', l: 'people were injured', y: '2022', s: 'MoRTH, Road Accidents in India 2022' },
]
export const REFS = [
  { t: 'Ministry of Road Transport and Highways (MoRTH)', u: 'https://morth.nic.in' },
  { t: 'Emergency Response Support System (ERSS 112)', u: 'https://112.gov.in' },
  { t: 'Press Information Bureau', u: 'https://pib.gov.in' },
  { t: 'Parivahan Sewa (Transport Department portal)', u: 'https://parivahan.gov.in' },
  { t: 'National Highways Authority of India (NHAI)', u: 'https://nhai.gov.in' },
]

// Traffic signs (Indian conventions). cat: Mandatory | Cautionary | Informatory
export const SIGNS = [
  { k: 'stop', name: 'Stop', cat: 'Mandatory', mean: 'You must stop completely at this point.', do: 'Halt at the stop line. Go only when the way is clear.' },
  { k: 'noEntry', name: 'No Entry', cat: 'Mandatory', mean: 'Vehicles may not enter this road from this side.', do: 'Do not enter. Find another route.' },
  { k: 'noParking', name: 'No Parking', cat: 'Mandatory', mean: 'You may not leave your vehicle parked here.', do: 'Park only in a marked parking area.' },
  { k: 'speed', name: 'Speed Limit', cat: 'Mandatory', mean: 'The number shows the highest speed allowed, in km/h.', do: 'Keep at or below the limit. Slow down more in bad weather.' },
  { k: 'oneWay', name: 'One Way', cat: 'Mandatory', mean: 'Traffic moves only in the direction of the arrow.', do: 'Drive the arrow way only. Never go against it.' },
  { k: 'noHorn', name: 'No Horn', cat: 'Mandatory', mean: 'Horns are not allowed here, often near hospitals and schools.', do: 'Keep your horn silent. Slow down and stay alert.' },
  { k: 'noUturn', name: 'No U-Turn', cat: 'Mandatory', mean: 'You may not turn around to go back the way you came.', do: 'Go ahead and use a permitted turning point.' },
  { k: 'turnLeft', name: 'Compulsory Turn Left', cat: 'Mandatory', mean: 'Vehicles must turn left at this point.', do: 'Get in the left lane early and turn left.' },
  { k: 'school', name: 'School Ahead', cat: 'Cautionary', mean: 'A school is near. Children may cross suddenly.', do: 'Slow down, be ready to stop, and give way to children.' },
  { k: 'crossing', name: 'Pedestrian Crossing', cat: 'Cautionary', mean: 'People may be crossing the road ahead.', do: 'Slow down and stop for anyone on the crossing.' },
  { k: 'sharpTurn', name: 'Sharp Turn', cat: 'Cautionary', mean: 'The road bends sharply ahead.', do: 'Slow down before the bend. Do not overtake.' },
  { k: 'narrow', name: 'Narrow Road', cat: 'Cautionary', mean: 'The road becomes narrower ahead.', do: 'Slow down and give way to oncoming traffic.' },
  { k: 'breaker', name: 'Speed Breaker', cat: 'Cautionary', mean: 'A raised hump on the road is ahead.', do: 'Slow down so you can cross it smoothly.' },
  { k: 'railway', name: 'Railway Crossing', cat: 'Cautionary', mean: 'A railway line crosses the road ahead.', do: 'Slow down, look both ways and never cross when the barrier is down.' },
  { k: 'slippery', name: 'Slippery Road', cat: 'Cautionary', mean: 'The road can be slippery, especially when wet.', do: 'Drive slowly and brake gently.' },
  { k: 'roadwork', name: 'Road Work Ahead', cat: 'Cautionary', mean: 'Workers or machines may be on the road.', do: 'Slow down, follow the cones and watch for workers.' },
  { k: 'hospital', name: 'Hospital', cat: 'Informatory', mean: 'A hospital is nearby.', do: 'Keep noise low and make way for ambulances.' },
  { k: 'petrol', name: 'Petrol Pump', cat: 'Informatory', mean: 'Fuel is available ahead.', do: 'Indicate early and slow down before turning in.' },
  { k: 'parking', name: 'Parking', cat: 'Informatory', mean: 'You may park here.', do: 'Park neatly inside the marked area.' },
  { k: 'busStop', name: 'Bus Stop', cat: 'Informatory', mean: 'Buses stop here for passengers.', do: 'Do not park here. Watch for people boarding.' },
  { k: 'firstAid', name: 'First Aid', cat: 'Informatory', mean: 'A first aid post is nearby.', do: 'Note the place in case you or someone needs help.' },
  { k: 'rest', name: 'Rest Area', cat: 'Informatory', mean: 'A place to stop and rest is ahead.', do: 'Take a break if you feel tired. Tired driving is risky.' },
]

export const MYTHS = [
  { m: 'Helmets are only needed for long journeys.', f: 'Wear a helmet on every ride. Many crashes happen close to home.', who: 'arjun' },
  { m: 'Rear-seat passengers do not need seatbelts.', f: 'Everyone in the car should buckle up, front and back.', who: 'sam' },
  { m: 'An airbag replaces a seatbelt.', f: 'Airbags are made to work together with seatbelts, not instead of them.', who: 'sam' },
  { m: 'Experienced drivers do not need to follow speed limits.', f: 'Speed limits apply to everyone, every time.', who: 'ravi' },
  { m: 'Using a phone briefly while driving is harmless.', f: 'Even a short look away from the road can cause a crash.', who: 'ravi' },
  { m: 'Zebra crossings make it safe to cross without looking.', f: 'Always look and wait for vehicles to stop before you step out.', who: 'riya' },
]

export const CAMPAIGNS = [
  { title: 'National Road Safety Month', text: 'India marks a dedicated road safety period each year with awareness drives in schools, colleges and communities. Check MoRTH for the current dates.', icon: 'Calendar', color: 'bg-sky' },
  { title: 'Helmet Awareness Drive', text: 'Volunteers speak with riders about wearing a certified, well-fitted helmet and fastening the strap.', icon: 'HardHat', color: 'bg-sun' },
  { title: 'Pedestrian Safety Walk', text: 'Students walk through local crossings with banners that show how to cross safely.', icon: 'Footprints', color: 'bg-mint' },
  { title: 'School Road Safety Programme', text: 'Short sessions for children on school bus rules, safe crossing and reading signs.', icon: 'School', color: 'bg-lav' },
  { title: 'Poster Competition', text: 'Draw a poster that shows one safe road habit. Use bold colours and a short message.', icon: 'Palette', color: 'bg-coral/40' },
  { title: 'Slogan Competition', text: 'Write a catchy line of ten words or fewer that helps people remember a road rule.', icon: 'MessageSquareQuote', color: 'bg-sun' },
]
export const SLOGANS = ['Helmet on, worry gone.', 'Look. Listen. Then cross.', 'Buckle up, front and back.', 'Slow down. Someone is waiting for you.', 'Your phone can wait. Your life cannot.', 'Zebra lines are safe lines.']
