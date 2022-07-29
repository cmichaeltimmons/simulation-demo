#include <nan.h>
#include <boost/program_options.hpp>
#include <vector>
#include <string>
#include <EquityCalculator.h>
#include <iostream>
using namespace std;
using namespace omp;
using namespace Nan;
using namespace v8;

void GameSimulator(const Nan::FunctionCallbackInfo<v8::Value> &args)
{
    v8::Local<v8::Context> context = args.GetIsolate()->GetCurrentContext();
    v8::Isolate *isolate = args.GetIsolate();

    //convert args to std
    v8::String::Utf8Value heroRange(isolate, args[0]);
    std::string stdHeroRange(*heroRange);
    v8::String::Utf8Value villianRange(isolate, args[1]);
    std::string stdVillianRange(*villianRange);

    EquityCalculator eq;
    vector<CardRange> ranges{stdHeroRange, stdVillianRange};
    uint64_t board = CardRange::getCardMask("");
    uint64_t dead = CardRange::getCardMask("");
    double stdErrMargin = 2e-5; // stop when standard error below 0.002%
    auto callback = [&eq](const EquityCalculator::Results &results) {};
    double updateInterval = 0.25; // Callback called every 0.25s.
    unsigned threads = 0;         // max hardware parallelism (default)
    eq.start(ranges, board, dead, false, stdErrMargin, callback, updateInterval, threads);
    eq.wait();
    auto r = eq.getResults();

    //covert simulation results to json Object
    v8::Local<v8::Object> jsonObject = Nan::New<v8::Object>();
    v8::Local<v8::String> heroProp = Nan::New("heroWins").ToLocalChecked();
    v8::Local<v8::String> villianProp = Nan::New("villianWins").ToLocalChecked();
    v8::Local<v8::Value> heroValue = Nan::New(r.equity[0]);
    v8::Local<v8::Value> villianValue = Nan::New(r.equity[1]);
    Nan::Set(jsonObject, heroProp, heroValue);
    Nan::Set(jsonObject, villianProp, villianValue);
    args.GetReturnValue().Set(jsonObject);
}

void Init(v8::Local<v8::Object> exports)
{
    v8::Local<v8::Context> context = exports->CreationContext();
    exports->Set(context,
                 Nan::New("runGameSimulations").ToLocalChecked(),
                 Nan::New<v8::FunctionTemplate>(GameSimulator)
                     ->GetFunction(context)
                     .ToLocalChecked());
}

NODE_MODULE(addon, Init)