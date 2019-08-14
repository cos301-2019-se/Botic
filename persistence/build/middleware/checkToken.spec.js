var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jsonwebtoken"));

var checkToken = require('./checkToken');
var httpMocks = require('node-mocks-http');

describe('checktoken checks the token in the incoming request', () => {

    it('checks valid JWT.', () => {
        
        var jwtSecret = 'D!MN';
        var subsystem = 'subsystem', component = 'component';

        var newToken = jwt.sign({ subsystem: subsystem, component: component }, jwtSecret, {
            expiresIn: '1h',
        });

        var req = httpMocks.createRequest({
            method: 'POST',
            url: '/saveLog',
            headers: {
                auth: newToken
            }
        });

        var res = httpMocks.createResponse({
            locals: {
                jwtPayload: ''
            },
            headers: {
                token: ''
            }
        });

        function next() {};
        next = jasmine.createSpy();
        // var spy = spyOn(this, 'next');
        checkToken.checkToken(req, res, next);

        var check = res._headers['token'];
        expect(res).toBeDefined();

        try {
            var payload = jwt.verify(check, jwtSecret);
            expect(subsystem).toBe(JSON.parse(JSON.stringify(payload)).subsystem);
            expect(component).toBe(JSON.parse(JSON.stringify(payload)).component);
        } catch (error) {
            fail(error); // 401
        }

        expect(next).toHaveBeenCalled();
    });
});