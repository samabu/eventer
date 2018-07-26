module.exports = {
    read: ( req, res ) => {
        const yelp = require('yelp-fusion');
        const apiKey = process.env.REACT_APP_API_KEY;
        let searchRequest = {}
        const client = yelp.client(apiKey);
        if (req.query.event_type === 'all' && req.query.preferred_price === '4' && req.query.search_input === '') {
            searchRequest = {
                location: req.query.zipcode,
                limit: 50,
            };
        }
        else if (req.query.event_type === 'all' && req.query.preferred_price === '4' && req.query.search_input !== '') {
            searchRequest = {
                location: req.query.zipcode,
                limit: 50,
                term: req.query.search_input
            };
        }
        else if (req.query.event_type === 'all' && req.query.preferred_price !== '4' && req.query.search_input === '') {
            searchRequest = {
                location: req.query.zipcode,
                limit: 50,
                price: req.query.preferred_price
            };
        }
        else if (req.query.event_type !== 'all' && req.query.preferred_price === '4' && req.query.search_input === '') {
            searchRequest = {
                location: req.query.zipcode,
                limit: 50,
                term: req.query.event_type
            };
        }
        else if (req.query.event_type === 'all' && req.query.preferred_price !== '4' && req.query.search_input !== '') {
            searchRequest = {
                location: req.query.zipcode,
                limit: 50,
                price: req.query.preferred_price,
                term: req.query.search_input
            };
        }
        else if (req.query.event_type !== 'all' && req.query.preferred_price !== '4' && req.query.search_input === '') {
            searchRequest = {
                location: req.query.zipcode,
                limit: 50,
                price: req.query.preferred_price,
                term: req.query.event_type
            };
        }
        else if (req.query.event_type !== 'all' && req.query.preferred_price === '4' && req.query.search_input !== '') {
            searchRequest = {
                location: req.query.zipcode,
                limit: 50,
                term: req.query.search_input + '' + req.query.event_type
            };
        }
        else if (req.query.event_type !== 'all' && req.query.preferred_price !== '4' && req.query.search_input !== '') {
            searchRequest = {
                location: req.query.zipcode,
                limit: 50,
                price: req.query.preferred_price,
                term: req.query.search_input + '' + req.query.event_type
            };
        }
            
        

        client.search(searchRequest).then(response => {
        res.send(response.jsonBody.businesses);
})
    }
}